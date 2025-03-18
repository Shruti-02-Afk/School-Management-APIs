import express from "express";
import db from "../config/connect.db.js";

// adding new school to the db
export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: "All fields are required",
            });
        }

        const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
        db.query(query, [name, address, latitude, longitude], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.status(201).json({
                success: true,
                message: "School added successfully",
                id: result.insertId
            });
        });
    } catch (err) {
        console.log(err);
    }
};

// searching school based on latitude & longitude
export const listSchool = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: "Latitude and longitude are required"
            });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const query = `SELECT *, (6371 * acos(
            cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude))
            )
            ) AS distance FROM schools ORDER BY distance ASC`;

        db.query(query, [userLat, userLon, userLat], (err, results) => {
            if(err) {
                return res.status(500).json({
                    success:false,
                    error:err.message
                });
            }

            return res.status(200).json({
                message:results,
                success:true
            });
        });
    } catch (err) {
        console.log(err);
    }
};