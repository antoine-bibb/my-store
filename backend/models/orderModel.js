import mongoose from'mongoose'; 

const orderSchema = mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please add a user']
        },
        orderItems:[
            {
                name: {
                    type: String,
                    required: [true, 'Please add a name']
                },
                qty: {
                    type: Number,
                    required: [true, 'Please add a qty']
                },
                price: {
                    type: Number,
                    required: [true, 'Please add a price']
                },
                image: {
                    type: String,
                    required: [true, 'Please add an image']
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Please select a product']
                },
                color: {
                    type: String,
                    required: [true, 'Please select a color']
                },
                size: {
                    type: String,
                    required: [true, 'Please select a size']
                }
            }
        ],
        shippingAddress: {
            address: {
                type: String,
                required: [true, 'Please add an address']
            },
            city: {
                type: String,
                required: [true, 'Please add a city']
            },
            postalCode: {
                type: String,
                required: [true, 'Please add a postalCode']
            },
            country: {
                type: String,
                required: [true, 'Please add a country']
            },
            state: {
                type: String,
                required: [true, 'Please add a state']
            },
            phone: {
                type: String,
                required: [true, 'Please add a phone']
            },
        }, 
            paymentMethod: {
            type: String,
            required: [true, 'Please add a paymentMethod']
        },
        paymentResult: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            update_time: {
                type: String,

            },
            email_address: {
                type: String,
            },
        },
        itemPrice:{
            type: Number,
            required: [true, 'Please add a itemPrice'],
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            required: [true, 'Please add a taxPrice'],
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: [true, 'Please add a shippingPrice'],
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: [true, 'Please add a totalPrice']
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            required: [true, 'Please add a isDelivered'],
            default: false
        },
        deliveredAt: {
            type: Date
        }
    },{
        timestamps: true,
});

const order = mongoose.model('Order', orderSchema);

export default order;