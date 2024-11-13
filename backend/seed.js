const mongoose = require("mongoose");
const Project = require("./models/Project");

const { uri} = require('./envVariables.js');
const MONGO_DB_URI = uri;

mongoose.connect(MONGO_DB_URI)
.then(() => {
  console.log(`mongoDB connected!`);
})
.catch((err) => {
  console.error(err.message);
});


const seedProjects = async () => {
    // Sample project data
    const sampleProjects = [
        {
            "city": "London",
            "district": "Enfield",
            "estType": "Apartment",
            "size": [2, 3],
            "description": "Modern two-bedroom apartment in a vibrant area.",
            "photos": [
                "http://example.com/photo1.jpg",
                "http://example.com/photo2.jpg",
                "http://example.com/photo3.jpg",
                "http://example.com/photo4.jpg"
            ],
            "favCount": 10,
            "dateAdded": "2024-11-01T12:00:00Z",
            "price": 300000
        },
        {
            "city": "London",
            "district": "Hendon",
            "estType": "House",
            "size": [4],
            "description": "Spacious four-bedroom family house with garden.",
            "photos": [
                "http://example.com/photo5.jpg",
                "http://example.com/photo6.jpg",
                "http://example.com/photo7.jpg",
                "http://example.com/photo8.jpg"
            ],
            "favCount": 15,
            "dateAdded": "2024-11-02T12:00:00Z",
            "price": 450000
        },
        {
            "city": "Liverpool",
            "district": "Merseyside",
            "estType": "Apartment",
            "size": [1],
            "description": "Charming one-bedroom apartment near the waterfront.",
            "photos": [
                "http://example.com/photo9.jpg",
                "http://example.com/photo10.jpg",
                "http://example.com/photo11.jpg",
                "http://example.com/photo12.jpg"
            ],
            "favCount": 5,
            "dateAdded": "2024-10-30T12:00:00Z",
            "price": 250000
        },
        {
            "city": "Manchester",
            "district": "City Centre",
            "estType": "Apartment",
            "size": [2],
            "description": "Stylish two-bedroom apartment in the heart of the city.",
            "photos": [
                "http://example.com/photo13.jpg",
                "http://example.com/photo14.jpg",
                "http://example.com/photo15.jpg",
                "http://example.com/photo16.jpg"
            ],
            "favCount": 8,
            "dateAdded": "2024-11-03T12:00:00Z",
            "price": 320000
        },
        {
            "city": "Birmingham",
            "district": "Selly Oak",
            "estType": "House",
            "size": [3],
            "description": "Family-friendly three-bedroom house close to local schools.",
            "photos": [
                "http://example.com/photo17.jpg",
                "http://example.com/photo18.jpg",
                "http://example.com/photo19.jpg",
                "http://example.com/photo20.jpg"
            ],
            "favCount": 12,
            "dateAdded": "2024-11-01T14:00:00Z",
            "price": 280000
        },
        {
            "city": "Bristol",
            "district": "Clifton",
            "estType": "Apartment",
            "size": [2, 3],
            "description": "Luxury apartment with stunning views of the city.",
            "photos": [
                "http://example.com/photo21.jpg",
                "http://example.com/photo22.jpg",
                "http://example.com/photo23.jpg",
                "http://example.com/photo24.jpg"
            ],
            "favCount": 20,
            "dateAdded": "2024-10-29T12:00:00Z",
            "price": 450000
        },
        {
            "city": "Leeds",
            "district": "Horsforth",
            "estType": "House",
            "size": [4],
            "description": "Beautiful four-bedroom house with large garden.",
            "photos": [
                "http://example.com/photo25.jpg",
                "http://example.com/photo26.jpg",
                "http://example.com/photo27.jpg",
                "http://example.com/photo28.jpg"
            ],
            "favCount": 9,
            "dateAdded": "2024-11-02T09:00:00Z",
            "price": 350000
        },
        {
            "city": "Glasgow",
            "district": "West End",
            "estType": "Apartment",
            "size": [1],
            "description": "Cozy one-bedroom apartment in a trendy neighborhood.",
            "photos": [
                "http://example.com/photo29.jpg",
                "http://example.com/photo30.jpg",
                "http://example.com/photo31.jpg",
                "http://example.com/photo32.jpg"
            ],
            "favCount": 7,
            "dateAdded": "2024-11-01T16:00:00Z",
            "price": 230000
        },
        {
            "city": "Cardiff",
            "district": "Riverside",
            "estType": "House",
            "size": [3],
            "description": "Three-bedroom home with contemporary design and garden.",
            "photos": [
                "http://example.com/photo33.jpg",
                "http://example.com/photo34.jpg",
                "http://example.com/photo35.jpg",
                "http://example.com/photo36.jpg"
            ],
            "favCount": 6,
            "dateAdded": "2024-10-30T12:00:00Z",
            "price": 295000
        },
        {
            "city": "Edinburgh",
            "district": "Leith",
            "estType": "Apartment",
            "size": [2],
            "description": "Modern two-bedroom apartment in a vibrant district.",
            "photos": [
                "http://example.com/photo37.jpg",
                "http://example.com/photo38.jpg",
                "http://example.com/photo39.jpg",
                "http://example.com/photo40.jpg"
            ],
            "favCount": 11,
            "dateAdded": "2024-10-29T11:00:00Z",
            "price": 400000
        },
        {
            "city": "Southampton",
            "district": "City Centre",
            "estType": "House",
            "size": [3],
            "description": "Charming three-bedroom house near the waterfront.",
            "photos": [
                "http://example.com/photo41.jpg",
                "http://example.com/photo42.jpg",
                "http://example.com/photo43.jpg",
                "http://example.com/photo44.jpg"
            ],
            "favCount": 13,
            "dateAdded": "2024-11-01T10:00:00Z",
            "price": 310000
        },
        {
            "city": "Nottingham",
            "district": "West Bridgford",
            "estType": "Apartment",
            "size": [2],
            "description": "Spacious two-bedroom apartment in a sought-after area.",
            "photos": [
                "http://example.com/photo45.jpg",
                "http://example.com/photo46.jpg",
                "http://example.com/photo47.jpg",
                "http://example.com/photo48.jpg"
            ],
            "favCount": 4,
            "dateAdded": "2024-11-02T14:00:00Z",
            "price": 260000
        },
        {
            "city": "Cambridge",
            "district": "City Centre",
            "estType": "House",
            "size": [4],
            "description": "Elegant four-bedroom house with historic charm.",
            "photos": [
                "http://example.com/photo49.jpg",
                "http://example.com/photo50.jpg",
                "http://example.com/photo51.jpg",
                "http://example.com/photo52.jpg"
            ],
            "favCount": 14,
            "dateAdded": "2024-10-31T08:00:00Z",
            "price": 500000
        },
        {
            "city": "Brighton",
            "district": "Hove",
            "estType": "Apartment",
            "size": [2],
            "description": "Stylish two-bedroom apartment close to the beach.",
            "photos": [
                "http://example.com/photo53.jpg",
                "http://example.com/photo54.jpg",
                "http://example.com/photo55.jpg",
                "http://example.com/photo56.jpg"
            ],
            "favCount": 19,
            "dateAdded": "2024-11-03T12:00:00Z",
            "price": 370000
        },
        {
            "city": "Leicester",
            "district": "City Centre",
            "estType": "House",
            "size": [3],
            "description": "Modern three-bedroom house in the heart of the city.",
            "photos": [
                "http://example.com/photo57.jpg",
                "http://example.com/photo58.jpg",
                "http://example.com/photo59.jpg",
                "http://example.com/photo60.jpg"
            ],
            "favCount": 10,
            "dateAdded": "2024-10-29T12:00:00Z",
            "price": 340000
        },
        {
            "city": "Aberdeen",
            "district": "City Centre",
            "estType": "Apartment",
            "size": [1],
            "description": "Compact one-bedroom apartment in the city center.",
            "photos": [
                "http://example.com/photo61.jpg",
                "http://example.com/photo62.jpg",
                "http://example.com/photo63.jpg",
                "http://example.com/photo64.jpg"
            ],
            "favCount": 3,
            "dateAdded": "2024-11-01T12:00:00Z",
            "price": 220000
        },
        {
            "city": "Swansea",
            "district": "Uplands",
            "estType": "House",
            "size": [3],
            "description": "Lovely three-bedroom house with views of the bay.",
            "photos": [
                "http://example.com/photo65.jpg",
                "http://example.com/photo66.jpg",
                "http://example.com/photo67.jpg",
                "http://example.com/photo68.jpg"
            ],
            "favCount": 8,
            "dateAdded": "2024-10-31T15:00:00Z",
            "price": 280000
        },
        {
            "city": "York",
            "district": "Fulford",
            "estType": "Apartment",
            "size": [2],
            "description": "Charming two-bedroom apartment in a historic area.",
            "photos": [
                "http://example.com/photo69.jpg",
                "http://example.com/photo70.jpg",
                "http://example.com/photo71.jpg",
                "http://example.com/photo72.jpg"
            ],
            "favCount": 5,
            "dateAdded": "2024-10-30T12:00:00Z",
            "price": 300000
        },
        {
            "city": "Belfast",
            "district": "Queen's Quarter",
            "estType": "House",
            "size": [4],
            "description": "Elegant four-bedroom house near the university.",
            "photos": [
                "http://example.com/photo73.jpg",
                "http://example.com/photo74.jpg",
                "http://example.com/photo75.jpg",
                "http://example.com/photo76.jpg"
            ],
            "favCount": 12,
            "dateAdded": "2024-10-31T12:00:00Z",
            "price": 460000
        }
    ];

    try {
        // Delete existing projects if needed
        await Project.deleteMany({});
        console.log('Existing projects deleted.');

        // Insert sample projects into the database
        await Project.insertMany(sampleProjects);
        console.log('Sample projects inserted successfully.');
    } catch (error) {
        console.error('Error seeding projects:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

seedProjects();