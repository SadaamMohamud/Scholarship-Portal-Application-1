import React from 'react';
import { Link } from 'react-router-dom';

// Soo dhoofso sawirada kooxda (Hubi in sawiradan ay ku jiraan galkaassets ama public)
// Haddii aad galka public ku haysato, waxaad toos u qori kartaa '/sadaam.jpg' iwm.
import sadaamImg from '../../assets/p1.jpg';
import jabirImg from '../../assets/p2.jpg';
import qaliImg from '../../assets/p3.jpg';
import abdirahmanImg from '../../assets/p4.jpg';
import about from '../../assets/about.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 text-gray-700 font-sans">
      
      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs text-gray-400 font-medium mb-2">Home / About Us</div>
          <h1 className="text-4xl font-extrabold text-[#031b33] leading-tight mb-4">
            About Somalia <br />
            <span className="text-[#0052cc]">Scholarship Portal</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Somalia Scholarship Portal is an online platform designed to help Somali students discover, 
            compare, and apply for scholarships offered by universities, governments, NGOs, and international 
            organizations. Our mission is to make scholarship opportunities easily accessible to every Somali student.
          </p>
          <Link to="/scholarships" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-all duration-300">
            Browse Scholarships
          </Link>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-lg h-[430px] rounded-3xl overflow-hidden shadow-2xl ring-8 ring-blue-100">
            <img src={about} alt="About Somalia Scholarship Portal" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

      {/* 2. Core Pillars Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Our Mission */}
        <div className="bg-white/90 backdrop-blur p-6 rounded-3xl border border-blue-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center">
          <div className="text-[#0052cc] bg-blue-50 p-3 rounded-full mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-2">Our Mission</h3>
          <p className="text-xs text-gray-500 leading-relaxed">To empower Somali students by providing one trusted platform for scholarship information and online applications.</p>
        </div>

        {/* Our Vision */}
        <div className="bg-white/90 backdrop-blur p-6 rounded-3xl border border-blue-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center">
          <div className="text-[#0052cc] bg-blue-50 p-3 rounded-full mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-2">Our Vision</h3>
          <p className="text-xs text-gray-500 leading-relaxed">To become Somalia's leading scholarship platform connecting platform with higher education opportunities worldwide.</p>
        </div>

        {/* Our Values */}
        <div className="bg-white/90 backdrop-blur p-6 rounded-3xl border border-blue-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center">
          <div className="text-[#0052cc] bg-blue-50 p-3 rounded-full mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-2">Our Values</h3>
          <ul className="text-xs text-gray-500 space-y-1 text-left list-disc list-inside">
            <li>Integrity</li>
            <li>Transparency</li>
            <li>Accessibility</li>
            <li>Opportunity</li>
            <li>Excellence</li>
          </ul>
        </div>

        {/* Who We Serve */}
        <div className="bg-white/90 backdrop-blur p-6 rounded-3xl border border-blue-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center">
          <div className="text-[#0052cc] bg-blue-50 p-3 rounded-full mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="font-bold text-gray-900 text-base mb-2">Who We Serve</h3>
          <p className="text-xs text-gray-500 leading-relaxed">High school students, Undergraduates, Graduates, and professionals seeking scholarship opportunities.</p>
        </div>
      </div>

      {/* 3. What We Offer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-start text-left">
            <div className="text-blue-600 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Scholarship Listings</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Browse hundreds of local and international scholarships.</p>
          </div>
          {/* Item 2 */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-start text-left">
            <div className="text-green-600 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V11m0 5h2m2 0h2m-2 0v-4m0 0h2m-2 0v3m-6-3h1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">University Information</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Learn about universities and their available programs.</p>
          </div>
          {/* Item 3 */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-start text-left">
            <div className="text-purple-600 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Online Applications</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Submit scholarship applications directly through the platform.</p>
          </div>
          {/* Item 4 */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-start text-left">
            <div className="text-amber-500 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5">Notifications</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Receive updates whenever new scholarships are published.</p>
          </div>
        </div>
      </div>

      {/* 4. Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur p-6 rounded-3xl border border-blue-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
          <h3 className="font-bold text-gray-900 text-base mb-4">Why Choose Us</h3>
          <ul className="space-y-2 text-xs font-medium text-gray-600">
            <li className="flex items-center space-x-2 text-[#0052cc]"><span>✓</span> <span className="text-gray-600">Verified Scholarships</span></li>
            <li className="flex items-center space-x-2 text-[#0052cc]"><span>✓</span> <span className="text-gray-600">Easy Application Process</span></li>
            <li className="flex items-center space-x-2 text-[#0052cc]"><span>✓</span> <span className="text-gray-600">Secure Student Accounts</span></li>
            <li className="flex items-center space-x-2 text-[#0052cc]"><span>✓</span> <span className="text-gray-600">Fast Search</span></li>
            <li className="flex items-center space-x-2 text-[#0052cc]"><span>✓</span> <span className="text-gray-600">Mobile Friendly</span></li>
            <li className="flex items-center space-x-2 text-[#0052cc]"><span>✓</span> <span className="text-gray-600">Completely Free</span></li>
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white/90 backdrop-blur p-6 rounded-3xl border border-blue-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex items-center justify-around text-center flex-wrap gap-4">
          <div>
            <div className="text-blue-600 text-2xl mb-1">🎓</div>
            <div className="text-2xl font-black text-gray-900">150+</div>
            <div className="text-xs text-gray-400 font-medium">Scholarships</div>
          </div>
          <div>
            <div className="text-green-600 text-2xl mb-1">👥</div>
            <div className="text-2xl font-black text-gray-900">5000+</div>
            <div className="text-xs text-gray-400 font-medium">Students</div>
          </div>
          <div>
            <div className="text-blue-900 text-2xl mb-1">🏛️</div>
            <div className="text-2xl font-black text-gray-900">20+</div>
            <div className="text-xs text-gray-400 font-medium">Universities</div>
          </div>
          <div>
            <div className="text-emerald-500 text-2xl mb-1">🤝</div>
            <div className="text-2xl font-black text-gray-900">30+</div>
            <div className="text-xs text-gray-400 font-medium">Partners</div>
          </div>
        </div>
      </div>

      {/* 5. Meet Our Team Section - SAWIRADA GOOBADA AH */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Member 1 - Sadaam */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-100 shadow-inner bg-gray-100">
              <img 
                src={sadaamImg} 
                alt="Sadaam" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <h4 className="font-bold text-gray-900 text-sm capitalize">sadaam</h4>
            <p className="text-[11px] text-gray-400 mb-3">Founder & Developer</p>
            <div className="flex space-x-3 text-gray-400 text-xs">
              <span className="hover:text-black cursor-pointer">GitHub</span>
            </div>
          </div>

          {/* Member 2 - Jabir */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-100 shadow-inner bg-gray-100">
              <img 
                src={jabirImg} 
                alt="Jabir" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <h4 className="font-bold text-gray-900 text-sm capitalize">jabir</h4>
            <p className="text-[11px] text-gray-400 mb-3">Scholarship Coordinator</p>
            <div className="flex space-x-3 text-gray-400 text-xs">
              <span className="hover:text-black cursor-pointer">GitHub</span>
            </div>
          </div>

          {/* Member 3 - Qali */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-100 shadow-inner bg-gray-100">
              <img 
                src={qaliImg} 
                alt="Qali" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <h4 className="font-bold text-gray-900 text-sm capitalize">Qali</h4>
            <p className="text-[11px] text-gray-400 mb-3">University Relations</p>
            <div className="flex space-x-3 text-gray-400 text-xs">
              <span className="hover:text-black cursor-pointer">GitHub</span>
            </div>
          </div>

          {/* Member 4 - C/raxmaan */}
          <div className="bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-5 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-gray-100 shadow-inner bg-gray-100">
              <img 
                src={abdirahmanImg} 
                alt="C/raxmaan" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <h4 className="font-bold text-gray-900 text-sm capitalize">C/raxmaan</h4>
            <p className="text-[11px] text-gray-400 mb-3">Support Officer</p>
            <div className="flex space-x-3 text-gray-400 text-xs">
              <span className="hover:text-black cursor-pointer">GitHub</span>
            </div>
          </div>

        </div>
      </div>

      {/* 6. Blue Call to Action Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white p-8 rounded-3xl shadow-2xl flex flex-wrap items-center justify-between gap-4 shadow-md">
          <div className="flex items-center space-x-4">
            <div className="text-3xl bg-white/10 p-2.5 rounded-xl">🎓</div>
            <div>
              <h3 className="font-bold text-lg">Ready to Start Your Scholarship Journey?</h3>
              <p className="text-xs text-blue-100 mt-0.5">Join thousands of students who are achieving their dreams.</p>
            </div>
          </div>
          <Link to="/register" className="bg-white text-[#0052cc] font-bold px-6 py-3 rounded-xl text-xs hover:bg-gray-100 transition shadow-sm">
            Apply Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;