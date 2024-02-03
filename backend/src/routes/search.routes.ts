import express, { Request, RequestHandler, Response } from 'express';
import Hotel from '../models/hotel.model';
import { HotelSearchResponse } from '../shared/types';

const router = express.Router();



router.get('/search', async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        //DROPDOWN OPTIONS TO SORT HOTEL DATA
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 }
        }


        //DEFAULT SIZE OF HOTELS PER PAGE
        const pageSize = 5;
        //PAGE NUMBER
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        //SKIPPER -->SKIPS HOTESL SHOWED ON EARLIER PAGES TO SHOW NEXTS ON CURRENT PAGE
        const skip = (pageNumber - 1) * pageSize;

        //FINDING HOTELS OF pageNumber COUNT AND skipped COUNT
        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
        // console.log(hotels);

        //TOTAL DOCUMENTS COUNT TO DISPLAY AT PAGINATION
        const total = await Hotel.countDocuments(query);

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize), //CALCULATES PAGES AS SINGLE PAGE DISPLAYS 5 ELEMENTS EACH
            },
        };

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong!" });
    }
});



const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if (queryParams.destination) {

        //MONGODB $or TO FETCH DATA WITH DESTINATION MATCHES EITHER CITY OR COUNTRY
        constructedQuery.$or = [
            //COMMON MONGO PATTERN REGEX TO MATCH CASE INSENSITIVE DESTINATIONS. i IS a FLAG FOR CASE_INSENSITIVE
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            //FIND WITH ANYTHING GREATER THAN OR EQUAL TO
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if (queryParams.childCount) {
        constructedQuery.childrenCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            //SHOULD MATCH ALL FROM ARRAY
            //USER CAN USE SELECT MULTIPLE FACILIETS OR SINGLE HERE
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            //SHOULD MATCH ANY FROM FROM NOT MADATORY TO MATCH ALL
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star: string) => parseInt(star))
            : parseInt(queryParams.stars);

        constructedQuery.starRating = { $in: starRatings };
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            //MATCH EVERYTHING THATS LESS THAN OR EQUAL TO
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};



export default router;