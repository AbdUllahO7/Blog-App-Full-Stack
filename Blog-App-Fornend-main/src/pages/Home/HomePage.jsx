import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero'
import Articles from './container/Articles'
import CTA from './container/CTA'
import Pricing from './container/Pricing'
import Descover from './container/Descover'
import NewsBlog from './container/NewsBlog'
import UserArticle from './container/UserArticle'

function HomePage() {
    return <MainLayout>
        <Hero />
        <Articles/>
        <Descover/>
        <NewsBlog/>
        <UserArticle/>
        <Pricing/>
        <CTA/>
    </MainLayout>
}

export default HomePage