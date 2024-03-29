import express from "express";

export const catchError = (e : unknown, res : express.Response) => {
    console.error(e);
    res.status(500).json({message: 'An internal server error occurred'});
}

export const notFound = (res : express.Response, entity: string) => {
    return res.status(404).json({message: `${entity} not found`});
}