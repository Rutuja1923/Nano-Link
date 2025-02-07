const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema  = new Schema(
    {
        shortID : {
            type: String,
            requied: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        visitHistory: [
            {
                timeStamp: {
                    type: Date,
                    default: () => new Date(),
                },
                ipAddress:{
                    type: String,
                },
                device: {
                    type: String,
                },
                browser: {
                    type: String,
                },
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    },
    {
        timestamps: true,
    },
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL; 
