import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Imgur } from 'meteor/simple:imgur';
import Future from 'fibers/future';
import puppeteer from 'puppeteer';

import { Sites } from './sites.js';

const urlSchema = Sites.schema.pick('address')

const takeScreenshot = new ValidatedMethod({
    name: 'takeScreenshot',
    validate: urlSchema.validator(),
    run({ address }) {
        return new Promise((resolve, reject) => {
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://' + address);
                const title = await page.title()
                await page.setViewport({
                    width: 1280,
                    height: 720
                })
                const buffer = await page.screenshot();
                const bufferImage = Buffer.from(buffer).toString('base64');
                await browser.close();
                Meteor.call('imgurUpload', { image: bufferImage }, (err, image) => {
                    if (err) {
                        throw new Meteor.Error(err);
                    } else {
                        resolve(Sites.insert({
                            name: title,
                            address,
                            createdAt: new Date(),
                            image
                        }))
                    }
                })
            })();
        })
    }
})

const imgurUpload = new ValidatedMethod({
    name: 'imgurUpload',
    validate: new SimpleSchema({
        image: String,
    }).validator(),
    run({ image }) {
        const future = new Future();
        Imgur.upload({
            image,
            apiKey: Meteor.settings.private.imgur.apiKey,
        }, (err, data) => {
            if (err) {
                future.throw(new Meteor.Error(err.reason));
            } else {
                future.return({
                    url: data.link,
                    deleteHash: data.deletehash,
                });
            }
        });
        return future.wait()
    }
})

// Get list of all method names
const SITE_METHODS = _.pluck([
    takeScreenshot,
    imgurUpload,
], 'name');

DDPRateLimiter.addRule({
    name(name) {
        return _.contains(SITE_METHODS, name);
    },

    // Rate limit only 5 calls per second
    connectionId() { return true; },
}, 5, 1000);
