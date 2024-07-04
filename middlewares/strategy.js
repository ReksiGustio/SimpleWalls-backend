const prisma = require('../prisma')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

const serialize = (user, done) => {
    console.log(`4 - serialize user: ${JSON.stringify(user)}`)
    return done(null, user.id)
  }

const deserialize = async (id, done) => {
    console.log(`5 - deserialize user: ${id}`)
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                userName: true,
                profile: true
            }
        })

        if (user)
            return done(null, user) 
        
    } catch (error) {
        return done(error, null)
    }
}

const strategy = new LocalStrategy({ passReqToCallback: true },
    async (req, username, password, done) => {
        console.log(`2 - Local strategy verify cb`)

        const user = await prisma.user.findFirst({
            where: {
                userName: username
            },
            select: {
                id: true,
                userName: true,
                password: true,
                profile: true,
            }
        })

        if (!user)
            return done(null, false)

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword)
            return done(null, false)

        return done(null, user)
    }
)

module.exports = { strategy, serialize, deserialize }