"use client";

import { useState } from "react";
import BarcelonaMap from "@/components/BarcelonaMap";
import { restaurants } from "@/data/restaurants";

export default function Home() {
  const categories = [
    "Restaurants",
    "Coffee and bakeries",
    "Pilates, dance and wellness",
    "Museums and culture",
    "Shops and design",
    "Walks and areas",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Restaurants");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(
    restaurants[0].id
  );

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.id === selectedRestaurantId
  );

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#1F1F1F]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[360px_1fr_420px]">
        {/* LEFT SIDEBAR */}
        <aside className="border-r border-black/10 p-5 lg:h-screen lg:overflow-y-auto">
          <nav className="mb-8 flex items-center justify-between">
            <div className="text-lg font-semibold">anna recommends</div>
            <div className="rounded-full border border-black/10 px-4 py-2 text-sm">
              Barcelona
            </div>
          </nav>

          <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-black/40">
            Choose category
          </label>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="mb-8 w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <h1 className="text-3xl font-semibold">{selectedCategory}</h1>

          <p className="mt-3 mb-6 text-sm leading-6 text-black/60">
            A curated collection of places I would actually recommend to a
            friend visiting Barcelona.
          </p>

          <div className="space-y-3">
            {restaurants.map((restaurant) => {
              const isSelected = restaurant.id === selectedRestaurantId;

              return (
                <article
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurantId(restaurant.id)}
                  className={`cursor-pointer rounded-3xl p-5 ring-1 transition ${
                    isSelected
                      ? "bg-[#1F1F1F] text-white ring-black shadow-xl"
                      : "bg-[#EFE3D3] text-[#1F1F1F] ring-black/10 hover:shadow-md"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        isSelected
                          ? "bg-white text-black"
                          : "bg-[#1F1F1F] text-white"
                      }`}
                    >
                      {restaurant.tags[0]}
                    </span>
                  </div>

                  <p className="text-sm opacity-60">
                    {restaurant.neighborhood} · {restaurant.price}
                  </p>

                  <p className="mt-3 text-sm leading-6 opacity-80">
                    {restaurant.description}
                  </p>
                </article>
              );
            })}
          </div>
        </aside>

        {/* CENTER MAP */}
        <section className="h-[60vh] p-4 lg:h-screen">
          <div className="h-full overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            <BarcelonaMap selectedRestaurantId={selectedRestaurantId} />
          </div>
        </section>

        {/* RIGHT DETAILS PANEL */}
        {selectedRestaurant && (
          <aside className="border-l border-black/10 bg-white p-6 lg:h-screen lg:overflow-y-auto">
            <div className="mb-6 h-56 rounded-[2rem] bg-[#EFE3D3]" />

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C47B4D]">
              {selectedRestaurant.category}
            </p>

            <h2 className="text-4xl font-semibold leading-tight">
              {selectedRestaurant.name}
            </h2>

            <p className="mt-2 text-sm text-black/50">
              {selectedRestaurant.neighborhood}, Barcelona
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span>★ 4.7</span>
              <span>•</span>
              <span>{selectedRestaurant.price}</span>
              <span>•</span>
              <span>{selectedRestaurant.tags.join(" · ")}</span>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-[#1F1F1F] px-5 py-3 text-sm text-white">
                Save
              </button>
              <button className="rounded-full border border-black/10 px-5 py-3 text-sm">
                Share
              </button>
              <button className="rounded-full border border-black/10 px-5 py-3 text-sm">
                Directions
              </button>
            </div>

            <section className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-black/40">
                Why I love it
              </p>
              <p className="text-sm leading-7 text-black/70">
                {selectedRestaurant.why}
              </p>
            </section>

            <section className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  Best for
                </p>
                <p className="mt-2 text-sm">
                  {selectedRestaurant.bestFor.join(", ")}
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  Atmosphere
                </p>
                <p className="mt-2 text-sm">{selectedRestaurant.atmosphere}</p>
              </div>

              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  Opening hours
                </p>
                <p className="mt-2 text-sm">
                  {selectedRestaurant.openingHours}
                </p>
              </div>
            </section>

            <section className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-black/40">
                Good to know
              </p>

              <ul className="space-y-2 text-sm text-black/70">
                {selectedRestaurant.goodToKnow.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8 border-t border-black/10 pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-black/40">
                Location
              </p>
              <p className="mt-2 text-sm text-black/70">
                {selectedRestaurant.address}
              </p>
            </section>
          </aside>
        )}
      </div>
    </main>
  );
}