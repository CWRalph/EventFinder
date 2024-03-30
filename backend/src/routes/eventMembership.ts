import express from 'express';
import {Group, Membership, User} from "../database/schema";
import {catchError, notFound} from "../error";

const eventMembershipRouter = express.Router();

export default eventMembershipRouter;
