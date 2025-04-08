const axios = require("axios");
const fs = require("node:fs");
const cheerio = require("cheerio");
const XLSX = require("xlsx");

const fetchData = async () => {
    try {
        for(let page_no=1; page_no <= 5; page_no++){
        const res = await axios.get(
            `https://www.amazon.com/s?k=phone&page=${page_no}&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_${page_no}`
        );

        //console.log(res.data, "response");
        fs.writeFile("amazon.txt", res.data, (err) => {
            if (err) {
                console.log("Error in writing the file",err); 
            }
                console.log("file created successfully");
                // read file
                const data = fs.readFileSync("amazon.txt", "utf-8")
                const $ = cheerio.load(data);
                //console.log($, "cheerio");
                
                //taking whole card
                    const productCard = $("div[data-uuid]");
                    const products = []; // product array
                    //extracting data from the file
                    productCard.each((index,element) => {
                        const title = $(element).find("h2 > span").text();
                        const price = $(element).find('.a-price-whole').text();
                        const rating = $(element).find('a > .a-size-base').text();
                        console.log(rating, "rating");
                        
                        // console.log(title, "title");
                        // console.log(price, "price");

                        if(title && price){
                            products.push({
                                title, // shorthand of key-object title: title
                                price,
                                rating,
                            });
                        }
                    });
                    console.log(products,"array");
                    //console.log(productCard,"card"); 
                    //console.log($('.a-price-whole').text(), "price");

                    
                    const workbook = XLSX.utils.book_new();//create a new workbook inside excel
                    const sheet = XLSX.utils.json_to_sheet(products); // create new sheet
                    XLSX.utils.book_append_sheet(workbook, sheet, "Produxts"); //appending sheet inside workbook

                    XLSX.writeFile(workbook, "product.xlsx" ); //write the workbook inside a new .xlsx file

                    console.log("Excel sheet created successfully");
                    
        });
    }
    }catch (err){
        console.log("error while fetching data", err);
    }; 
};
fetchData();
