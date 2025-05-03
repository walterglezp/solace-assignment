"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) ||
        advocate.phoneNumber.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
    setSearchTerm(searchTerm);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Solace Advocates
      </h1>

      <div className="mb-6 space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Search Advocates
        </label>
        <input
          type="text"
          className="w-full p-2 border border-blue-300 rounded focus:border-blue-300"
          placeholder="Enter name, city, degree, etc..."
          onChange={onChange}
          value={searchTerm}
        />
        <p className="text-sm text-gray-500">
          Searching for: <span className="font-semibold">{searchTerm}</span>
        </p>
        <button
          onClick={onClick}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reset Search
        </button>
      </div>

      <div>
        <table>
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">Degree</th>
              <th className="px-4 py-2 border">Specialties</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate, i) => (
              <tr key={i}>
                <td className="px-4 py-2 border">{advocate.firstName}</td>
                <td className="px-4 py-2 border">{advocate.lastName}</td>
                <td className="px-4 py-2 border">{advocate.city}</td>
                <td className="px-4 py-2 border">{advocate.degree}</td>
                <td className="px-4 py-2 border space-y-1">
                  {advocate.specialties.map((s, j) => (
                    <div
                      key={j}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {s}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border text-center">
                  {advocate.yearsOfExperience}
                </td>
                <td className="px-4 py-2 border">{advocate.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
