import { Request, Response } from "express";
import { Usermodel } from "../models/UserModel";


export const registrar = async (req: Request, res: Response) => {

    /**
     * EVITAR REGISTROS DUPLICADO
     */
    const { email } = req.body
    const existeUsuario = await Usermodel.findOne({ email })

    if (existeUsuario) {
        const error = new Error("El usuario ya existe")
        res.status(400).json({ message: error.message })
    }

    try {
        const usuario = new Usermodel(req.body)
        const usuarioAlmacenado = await usuario.save()
        res.json({ usuarioAlmacenado })

    } catch (error) {
        console.log(error)
    }
};

