import { Categories } from "@/modules/homepage/Categories";
import { HeroSection } from "@/modules/homepage/HeroSection";
import {FeaturedMeals} from "@/modules/homepage/FeaturedMeals";
import {HowItWorks} from "@/modules/homepage/HowItWorks";


export default function Home() {
    return (
        <>
            <HeroSection />
            <Categories />
            <FeaturedMeals />
            <HowItWorks />
        </>
    );
}