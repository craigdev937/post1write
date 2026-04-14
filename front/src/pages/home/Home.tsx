import React from "react";
import "./Home.css";
import HeroImg from "@public/home.png"
import { Link } from "react-router";

export const Home = () => {
    return (
        <React.Fragment>
            <main className="home">
                {/* HERO SECTION */}
                <section className="home__hero">
                    <div className="home__hero-img">
                        <img src={HeroImg} alt="Hero Image" />
                    </div>

                    <div className="home__hero-text">
                        <h1>Write Your Own Stories And Share Them With Everyone!</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, tenetur
                            sequi odit ipsam iusto cupiditate totam aut eligendi dolorem vero.
                        </p>
                        <Link to="/write">
                            <button className="btn-primary">Write a Story</button>
                        </Link>
                    </div>
                </section>

                {/* STORIES SECTION */}
                <section className="home__stories">
                    <h2 className="home__stories-title">Latest Stories</h2>

                    {status === "loading" && (
                        <div className="home__status">Loading...</div>
                    )}

                    {status === "error" && (
                        <div className="home__status">Oops somethjing went wrong...</div>
                    )}

                    {status === "success" && (
                        <div className="home__grid">
                            {/* Stories Map Goes Here */}
                            <div 
                                // key={Story.id}
                                className="story-card"
                            >
                                <div className="story-card__img">
                                    <img src="" alt="" />
                                </div>
                                <h3 className="story-card__title"></h3>
                                {/* <Link
                                    to={`/story/${Story.id}`}
                                >
                                    <button className="btn-primary">Read Story</button>
                                </Link> */}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </React.Fragment>
    );
};


