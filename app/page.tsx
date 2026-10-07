/* Native images keep the supplied challenge assets at their intrinsic sizes. */
/* eslint-disable @next/next/no-img-element */
import { siteName } from "./site";

const stats = [
  { label: "Followers", value: "80K" },
  { label: "Likes", value: "803K" },
  { label: "Photos", value: "1.4K" },
];

export default function Home() {
  return (
    <div className="page">
      <main>
        <article className="profile-card" aria-labelledby="profile-name">
          <div className="profile-header" aria-hidden="true" />
          <img className="avatar" src="/images/image-victor.jpg" width="96" height="96" alt="Portrait of Victor Crest" />
          <div className="profile-details">
            <h1 id="profile-name">
              Victor Crest <span className="age"><span className="sr-only">, age </span>26</span>
            </h1>
            <p className="location">London</p>
          </div>
          <dl className="stats">
            {stats.map(stat => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </main>
      <footer>
        <strong className="site-name">{siteName}</strong>. Challenge by <a href="https://www.frontendmentor.io/challenges/profile-card-component-cfArpWshJ">Frontend Mentor</a>. Built by <a href="https://royeradames.com">Royer Adames</a>.
      </footer>
    </div>
  );
}
