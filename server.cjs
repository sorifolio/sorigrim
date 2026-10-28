const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/api/etsy", async (req, res) => {
  try {
    const shopId = process.env.ETSY_SHOP_ID;
    const apiKey = process.env.ETSY_API_KEY;
    const secret = process.env.ETSY_SHARED_SECRET;

    const headers = {
      "x-api-key": `${apiKey}:${secret}`,
    };

    // 1. 상품 목록 조회
    const listingsResponse = await fetch(
      `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=25`,
      { headers },
    );

    const listingsData = await listingsResponse.json();

    if (!listingsResponse.ok) {
      return res.status(listingsResponse.status).json(listingsData);
    }

    const listings = listingsData.results || [];

    if (listings.length === 0) {
      return res.json({ ...listingsData, results: [] });
    }

    // 2. 모든 상품의 이미지를 한 번에 조회
    const listingIds = listings.map((listing) => listing.listing_id).join(",");

    const imagesResponse = await fetch(
      `https://openapi.etsy.com/v3/application/listings/batch?listing_ids=${listingIds}&includes=Images`,
      { headers },
    );

    const imagesData = await imagesResponse.json();

    if (!imagesResponse.ok) {
      return res.status(imagesResponse.status).json(imagesData);
    }

    // 3. 이미지 정보를 원래 상품에 합치기
    const imageMap = new Map(
      (imagesData.results || []).map((listing) => [
        listing.listing_id,
        listing.images || [],
      ]),
    );

    const results = listings.map((listing) => ({
      ...listing,
      images: imageMap.get(listing.listing_id) || [],
    }));

    res.json({ ...listingsData, results });
  } catch (error) {
    console.error("Etsy 상품 조회 오류:", error);
    res.status(500).json({ error: "Etsy 상품 조회 실패" });
  }
});

app.listen(3001, () => {
  console.log("Etsy API 서버: http://localhost:3001");
});
