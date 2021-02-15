import React from 'react';
import '../css/blog-details.css';

const BlogDetailsScreen = ({ match, history }) => {
    const blogId = match.params.id;

    return (
      <>
        <div className='blog-inner'>
          <article className='post-full'>
            <header className='post-full-header'>
              <section className='post-full-meta'>
                <time
                  className='post-full-meta-date'
                  dateTime='february 14, 2021'
                >
                  february 14, 2021
                </time>
              </section>
              <h1 className='post-full-title'>
                How I Went from Hackathons to CTO of a 20 Person SaaS Company in
                3 Years
              </h1>
            </header>
            <div className='post-full-author-header'>
              <section className='author-card'>
                <img
                  className='author-profile-image'
                  src='../images/twitter-avatar.png'
                  alt='skylineCodes'
                />
                <section className='author-card-content author-card-content-no-bio'>
                  <h4 className='author-card-name'>
                    <a href='#'>Onakoya Korede</a>
                  </h4>
                </section>
              </section>
            </div>
            <figure className='post-full-image'>
              <img src='../images/laptop.jpg' alt='laptop' />
            </figure>
            <section className='post-full-content'>
              <div className='post-content'>
                <p className='paragraph-one'>
                  In this article I will share the story of how I became CTO of
                  a software as a service (SaaS) company. It all started about 3
                  years ago when I was going to hackathons for fun.{' '}
                </p>
                <p>
                  At the end of the article you can find some tips and advice I
                  would give to aspiring entrepreneurs as well as some reading
                  recommendations.
                </p>
              </div>
            </section>
          </article>
        </div>
      </>
    );
}

export default BlogDetailsScreen
