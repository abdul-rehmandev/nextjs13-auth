import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
    try {
        const token = req.cookies.get("accessToken")?.value || "";

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message)
    }
}