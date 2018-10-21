import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Sites = new Mongo.Collection('sites');

Sites.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Sites.schema = new SimpleSchema({
    name: String,
    address: {
        type: String,
        regEx: SimpleSchema.RegEx.Domain,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date(),
    },
    image: String
})