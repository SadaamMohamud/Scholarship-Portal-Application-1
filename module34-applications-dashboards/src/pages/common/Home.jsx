import React from 'react';
import { Link } from 'react-router-dom';

import studentHero from '../../assets/Home.png';
import simad from '../../assets/simad.jpg';
import jazira from '../../assets/jazira.jpg';
import banadir from '../../assets/banadir.jpeg';
import justImage from '../../assets/JUST.jpg';
import Oxford from '../../assets/Oxford.png';
import chevening from '../../assets/Chevening.png';
import amoud from '../../assets/amoud.jpg';
import hargeysa from '../../assets/University.jpg';
import graduationBg from '../../assets/graduation.jpg';

const mockScholarships = [
  {
    id: 1,
    title: 'Chevening International Leadership Scholarship 2026',
    host: 'UK Government Scholarships',
    type: 'Full Funded',
    date: '15 November 2026',
    image: chevening
  },
  {
    id: 2,
    title: 'Oxford Clarendon Graduate Scholarship 2026',
    host: 'University of Oxford',
    type: 'Full Funded',
    date: '15 November 2026',
    image: Oxford
  },
  {
    id: 3,
    title: 'Amoud University Undergraduate Merit Grant 2026',
    host: 'Amoud University',
    type: 'Full Funded',
    date: '10 August 2026',
    image: amoud
  },
  {
    id: 4,
    title: 'University of Hargeisa Scholarship 2026',
    host: 'University of Hargeisa',
    type: 'Partial Funded',
    date: '12 September 2026',
    image: hargeysa
  },
  {
    id: 5,
    title: 'JUST Advanced Technology & Computing Doctoral Fellowship',
    host: 'Jamhuriya University of Science and Technology',
    type: 'Full Funded',
    date: '25 July 2026',
    image: justImage
  },
  {
    id: 6,
    title: 'SIMAD Postgraduate Academic Excellence Scholarship',
    host: 'SIMAD University',
    type: 'Full Funded',
    date: '20 July 2026',
    image: simad
  },
  {
    id: 7,
    title: 'Jazeera University Medical Faculty Grant 2026',
    host: 'Jazeera University',
    type: 'Partial Funded',
    date: '15 August 2026',
    image: jazira
  },
  {
    id: 8,
    title: 'Benadir University Health Sciences Scholarship 2026',
    host: 'Benadir University',
    type: 'Full Funded',
    date: '05 September 2026',
    image: banadir
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* HERO SECTION */}
      {/* HERO SECTION */}
<section
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${graduationBg})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/55"></div>

  {/* Blue Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-transparent"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-7">
      <span className="inline-block bg-blue-600/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
        🎓 Scholarship Portal
      </span>

      <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
        Find Your Dream
        <span className="block text-blue-300">
          Scholarship
        </span>
      </h1>

      <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
        Discover and apply for scholarships offered by Somali universities
        and international partners. Start your academic journey today.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/scholarships"
          className="bg-[#0052cc] text-white px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition"
        >
          Browse Scholarships
        </Link>

        <Link
          to="/register"
          className="bg-white text-gray-800 px-7 py-3.5 rounded-xl font-bold shadow-lg hover:bg-gray-100 hover:-translate-y-1 transition"
        >
          Apply Now
        </Link>
      </div>
    </div>

    <div className="flex justify-center lg:justify-end">
      <div className="relative bg-white/10 backdrop-blur-md rounded-[40px] p-6 border border-white/20 shadow-2xl">
        <img
          src={studentHero}
          alt="Student Hero"
          className="max-h-[430px] object-contain hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  </div>
</section>

      {/* SCHOLARSHIPS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#031b33]">
              Featured Scholarships
            </h2>

            <p className="text-gray-500 mt-2">
              Explore opportunities and apply before deadlines
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {mockScholarships.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col justify-between p-5"
            >
              <div>
                <div className="h-44 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden mb-5">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="max-h-full max-w-full object-contain hover:scale-110 transition duration-500"
                  />
                </div>

                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 min-h-[3rem]">
                  {s.title}
                </h3>

                <p className="text-xs text-gray-500 mt-2">
                  {s.host}
                </p>

                <span className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold ${s.type === 'Full Funded' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {s.type}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>Deadline</span>

                  <span className="font-bold text-gray-700">
                    {s.date}
                  </span>
                </div>

                <Link
                  to={`/scholarships/${s.id}`}
                  className="block text-center bg-[#0052cc] text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;