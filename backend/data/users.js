import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "Antoine Bibb",
        email: 'ajbibb0114@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: "Teara Edwards",
        email: 'tearanedwards@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
]

export default users;