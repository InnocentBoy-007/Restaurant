import { OrderService } from "../services/clientService.js";
import { CustomError } from "../components/CustomError.js";

const orderService = new OrderService();

export const OTPverification = async(req, res) => {
    const {productId, phoneNo} = req.body;
    try {
        const response = await orderService.clientVerification(productId, phoneNo);
        return res.status(200).json(response);
    } catch (error) {
        if(error instanceof CustomError) {
            return res.status(error.errorCode).json({message:error.message});
        }
        res.status(500).json({message:"Internal server error! - backend"});
    }
}

// Controller functions of OrderService class (standalone functions)
export const placeOrder = async (req, res) => {
    const { otpCode } = req.params;
    const { orderDetails } = req.body;

    try {
        const response = await orderService.placeOrder(otpCode, orderDetails);
        return res.status(200).json(response)

    } catch (error) {
        // Handle the error based on its type or properties
        if (error instanceof CustomError) {
            return res.status(error.errorCode).json({ message: error.message });
        }
        // For unexpected errors, return a generic message
        return res.status(500).json({ message: "Internal server error! - backend" });
    }
}

// not tested
export const cancelOrder = async(req, res) => {
    const {orderProductDetails} = req.body;
    try {
        const response = await orderService.cancelOrder(orderProductDetails.orderId);
        return res.status(204).json(response);
    } catch (error) {
        if(error instanceof CustomError) {
            return res.status(error.errorCode).json({message: error.message});
        }
        return res.status(500).json({message:"Internal server error! - backend"});
    }
}

// not tested
export const orderConfirmation = async(req, res)=> {
    const {orderId} = req.params;
    const {clientConfirmation} = req.body;
    try {
        const response = await orderService.orderConfirmation(orderId, clientConfirmation);
        return res.status(200).json(response);
    } catch (error) {
        if(error instanceof CustomError) {
            return res.status(error.errorCode).json({message:error.message});
        }
        return res.status(500).json({message:"Internal server error! - backend"});
    }
}
