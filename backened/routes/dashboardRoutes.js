
import express from 'express';
import { getDashboardStats, getSalesByCategory } from '../controller/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/stats', getDashboardStats);
dashboardRouter.get('/sales-by-category', getSalesByCategory);

export default dashboardRouter;
