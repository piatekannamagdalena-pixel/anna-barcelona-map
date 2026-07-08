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

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#1F1F1F]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[420px_1fr]">
        <aside className="border-r border-black/10 p-6 lg:h-screen lg:overflow-y-auto">
          <nav className="mb-10 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">
              anna recommends
            </div>

            <div className="rounded-full border border-black/10 px-4 py-2 text-sm">
              Barcelona
            </div>
          </nav>

          <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-black/50">
            Choose category
          </label>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="mb-8 w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm shadow-sm outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <h1 className="text-4xl font-semibold leading-tight">
            {selectedCategory}
          </h1>

          <p className="mt-4 mb-8 text-sm leading-6 text-black/60">
            A curated collection of places I would actually recommend to a
            friend visiting Barcelona.
          </p>

          <div className="space-y-4">
            {restaurants.map((restaurant) => {
              const isSelected = restaurant.id === selectedRestaurantId;

              return (
                <article
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurantId(restaurant.id)}
                  className={`cursor-pointer rounded-3xl p-5 ring-1 transition ${
                    isSelected
                      ? "bg-[#1F1F1F] text-white ring-black shadow-xl"
                      : "bg-[#EFE3D3] text-[#1F1F1F] ring-black/10 hover:shadow-lg"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {restaurant.name}
                    </h2>

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

                  <p
                    className={`text-sm ${
                      isSelected ? "text-white/60" : "text-black/50"
                    }`}
                  >
                    {restaurant.neighborhood} · {restaurant.price}
                  </p>

                  <p
                    className={`mt-3 text-sm leading-6 ${
                      isSelected ? "text-white/80" : "text-black/70"
                    }`}
                  >
                    {restaurant.description}
                  </p>

                  <p
                    className={`mt-4 text-sm ${
                      isSelected ? "text-white/70" : "text-black/60"
                    }`}
                  >
                    <span className="font-semibold">Anna's note:</span>{" "}
                    {restaurant.why}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {restaurant.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs ring-1 ${
                          isSelected
                            ? "bg-white/10 text-white ring-white/20"
                            : "bg-white text-black/60 ring-black/10"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </aside>

        <section className="h-[70vh] p-4 lg:h-screen">
          <div className="h-full overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            <BarcelonaMap selectedRestaurantId={selectedRestaurantId} />
          </div>
        </section>
      </div>
    </main>
  );
}