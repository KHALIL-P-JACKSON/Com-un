import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  HeartHandshake,
  Map,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import { filterListings, listings } from './data';
import type { Listing } from './data';
import { readSaved, writeSaved } from './saved';
import EventMap from './EventMap';

const tabs = ['Feed', 'Internships', 'Map', 'Saved'] as const;
const icons = [HeartHandshake, BriefcaseBusiness, Map, Bookmark];

export default function App() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Feed');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [saved, setSaved] = useState<string[]>(readSaved);
  const [selected, setSelected] = useState<Listing | null>(null);
  const [storageError, setStorageError] = useState(false);
  const items = filterListings(listings, tab, query, category, saved);

  function changeTab(next: (typeof tabs)[number]) {
    setTab(next);
    setCategory('All');
    setSelected(null);
  }

  function toggleSave(id: string) {
    const next = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    setSaved(next);
    setStorageError(!writeSaved(next));
  }

  return (
    <>
      <a className="skip-link" href="#opportunities">
        Skip to opportunities
      </a>
      <header className="site-header">
        <a
          href="#"
          className="brand"
          aria-label="Com-un home"
          onClick={() => changeTab('Feed')}
        >
          <HeartHandshake size={28} aria-hidden="true" />
          com-un<span className="brand-dot">.</span>
        </a>
        <span className="header-tagline">Good things happen together.</span>
        <span className="location">
          <MapPin size={16} aria-hidden="true" />
          Atlanta, GA<span className="demo-tag">Demo</span>
        </span>
      </header>

      <div className="app-shell">
        <aside className="sidebar">
          <nav aria-label="Main navigation">
            {tabs.map((name, index) => {
              const Icon = icons[index];
              return (
                <button
                  key={name}
                  aria-current={tab === name ? 'page' : undefined}
                  onClick={() => changeTab(name)}
                >
                  <Icon size={20} aria-hidden="true" />
                  {name === 'Feed' ? 'Community feed' : name}
                  {name === 'Saved' && (
                    <span className="saved-count">{saved.length}</span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="sidebar-note">
            <span className="note-mark" aria-hidden="true">
              ↗
            </span>
            <h2>A stronger community starts nearby.</h2>
            <p>
              Find a place to lend a hand, learn something, or meet someone new.
            </p>
            <a href="#opportunities">
              Find your next thing
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="sidebar-footer">Built for the places we call home.</p>
        </aside>

        <main>
          <section className="welcome">
            <div>
              <h1>
                {tab === 'Internships'
                  ? 'Grow here. Give back.'
                  : tab === 'Map'
                    ? 'See what’s happening nearby.'
                    : tab === 'Saved'
                      ? 'Good things, kept close.'
                      : 'Your neighborhood.\nYour next good thing.'}
              </h1>
              <p>
                {tab === 'Internships'
                  ? 'Find experience with a purpose, right in your community.'
                  : tab === 'Saved'
                    ? 'Come back to the opportunities you’d like to explore.'
                    : 'A place for local people and organizations to show up for each other.'}
              </p>
              <a className="welcome-link" href="#opportunities">
                Explore opportunities
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="welcome-aside">
              <HeartHandshake size={62} strokeWidth={1.3} aria-hidden="true" />
              <p>
                Small acts.
                <br />
                Shared possibilities.
              </p>
            </div>
          </section>

          <div className="demo-notice">
            You’re exploring a demo. All organizations, events, and internships
            below are illustrative. Saves stay in this browser.
          </div>

          <section
            id="opportunities"
            className="opportunities"
            aria-labelledby="section-title"
          >
            <div className="section-heading">
              <h2 id="section-title">
                {tab === 'Feed'
                  ? 'Around the community'
                  : tab === 'Map'
                    ? 'On the map'
                    : tab === 'Saved'
                      ? 'Your saved opportunities'
                      : 'Local internships'}
              </h2>
              <span aria-live="polite">
                {items.length}{' '}
                {items.length === 1 ? 'opportunity' : 'opportunities'}
              </span>
            </div>
            <div className="filters">
              <label className="search-box">
                <Search size={18} aria-hidden="true" />
                <span className="sr-only">Search opportunities</span>
                <input
                  type="search"
                  placeholder="Search opportunities, organizations…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              {tab !== 'Internships' && (
                <label className="category-select">
                  <span className="sr-only">Opportunity type</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="All">All opportunities</option>
                    <option>Volunteer</option>
                    <option>Gathering</option>
                    <option>Workshop</option>
                    {tab !== 'Feed' && <option>Internship</option>}
                  </select>
                </label>
              )}
            </div>
            {storageError && (
              <p role="alert" className="storage-error">
                Your browser couldn’t save this change. Your selection is kept
                for this visit; enable browser storage to keep it after
                refreshing.
              </p>
            )}
            {tab === 'Map' && <EventMap items={items} onSelect={setSelected} />}
            {selected && (
              <section
                className="detail-panel"
                aria-label="Opportunity details"
                aria-live="polite"
              >
                <button
                  className="close-detail"
                  aria-label="Close details"
                  onClick={() => setSelected(null)}
                >
                  <X size={20} />
                </button>
                <span className="category">{selected.category}</span>
                <h3>{selected.title}</h3>
                <p>{selected.detail}</p>
                <p>
                  <MapPin size={15} aria-hidden="true" />
                  {selected.location}
                </p>
              </section>
            )}
            {items.length === 0 ? (
              <div className="empty-state">
                <Search size={30} aria-hidden="true" />
                <h3>
                  {tab === 'Saved' && saved.length === 0
                    ? 'Keep something good for later.'
                    : 'No opportunities found.'}
                </h3>
                <p>
                  {tab === 'Saved' && saved.length === 0
                    ? 'Select the bookmark on any opportunity to find it here.'
                    : 'Try another search or opportunity type.'}
                </p>
                {(query || category !== 'All') && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setCategory('All');
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="listing-feed">
                {items.map((item) => (
                  <article key={item.id} className="listing">
                    <div
                      className={`organization-avatar avatar-${item.category.toLowerCase()}`}
                      aria-hidden="true"
                    >
                      {item.organization
                        .split(' ')
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join('')}
                    </div>
                    <div className="listing-body">
                      <div className="organization-line">
                        <strong>{item.organization}</strong>
                        <span>{item.organizationType}</span>
                      </div>
                      <span
                        className={`category category-${item.category.toLowerCase()}`}
                      >
                        {item.category}
                      </span>
                      <h3>
                        <button
                          className="title-button"
                          onClick={() => setSelected(item)}
                        >
                          {item.title}
                        </button>
                      </h3>
                      <p>{item.description}</p>
                      <div className="listing-meta">
                        <span>
                          <CalendarDays size={15} aria-hidden="true" />
                          {item.when}
                        </span>
                        <span>
                          <MapPin size={15} aria-hidden="true" />
                          {item.location}
                        </span>
                      </div>
                      <button
                        className="detail-link"
                        onClick={() => setSelected(item)}
                      >
                        View details
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      className={`save-button ${saved.includes(item.id) ? 'is-saved' : ''}`}
                      aria-label={`${saved.includes(item.id) ? 'Unsave' : 'Save'} ${item.title}`}
                      aria-pressed={saved.includes(item.id)}
                      onClick={() => toggleSave(item.id)}
                    >
                      {saved.includes(item.id) ? (
                        <Check size={19} aria-hidden="true" />
                      ) : (
                        <Bookmark size={19} aria-hidden="true" />
                      )}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
          <footer className="main-footer">
            <span>Com-un · A little closer, together.</span>
            <span>Demo listings · No registration or applications yet</span>
          </footer>
        </main>
      </div>
    </>
  );
}
