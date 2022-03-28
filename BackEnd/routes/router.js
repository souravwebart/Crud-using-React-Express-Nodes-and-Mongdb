
const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const multer = require('multer');
// router.get('/', (req, res) => {
//     console.log('api is running')
// })
// const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./frontend/public/uploads/");
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // cb(null, file.fieldname + "-" + uniqueSuffix);
        cb(
            null,
            // toString("hex") + path.extname(file.originalname)
            file.originalname
        );
    }
});
const filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });
// export const upload = multer({ storage: storage });

// module.exports = { upload };

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './frontend/public/uploads/');
//     },
//     fileName: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })

// const upload = multer({ storage: storage });

router.post('/', upload.single("picture"), async (req, res) => {
    console.log('req', req.file)
    const { name, mobile, email, dob, jobtype, location } = req.body;

    let picture = req.file.originalname;

    // console.log("picture", req.file.originalname)


    if (!name || !mobile || !email || !dob) {
        res.status(422).json('Please Fill the data');
    }

    try {
        const preuser = await users.findOne({ email: email });
        // console.log(preuser);

        if (preuser) {
            res.status(422).json('This user already present in our database')
        } else {
            const addUser = new users({
                name, mobile, email, picture, dob, jobtype, location
            });

            await addUser.save();
            res.status(201).json(addUser);
            // console.log('addUser', addUser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})

router.get('/getdata', async (req, res) => {
    try {
        const userData = await users.find();
        res.status(201).json(userData);
        // console.log(userData)
    } catch (error) {
        res.status(422).json(error);

    }
})

router.get('/getuser/:id', async (req, res) => {
    try {

        // console.log(req.params.id)
        const { id } = req.params;

        const userindiidual = await users.findById({ _id: id });

        console.log(userindiidual);

        res.status(201).json(userindiidual);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.patch('/updateuser/:id', async (req, res) => {
    try {
        const { id } = req.params;

        console.log("hi", req.body)

        const updateuser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log("updateuser", updateuser)
        res.status(201).json(updateuser);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await users.findByIdAndDelete({ _id: id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
