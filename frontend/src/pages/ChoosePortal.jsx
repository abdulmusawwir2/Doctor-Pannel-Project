// // src/pages/ChoosePortal.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function ChoosePortal() {
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
//             <h1 className="text-4xl font-bold mb-10 text-gray-800">
//                 Choose Your Portal
//             </h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
//                 {/* Admin/Doctor Panel Card */}
//                 <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between hover:shadow-2xl transition">
//                     <div>
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//                             Admin / Doctor Panel
//                         </h2>
//                         <p className="text-gray-500 mb-6">
//                             Access management tools, doctor dashboard, and schedule handling.
//                         </p>
//                     </div>
//                     <a
//                         href="http://localhost:5174/"
//                         className="inline-block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
//                     >
//                         Go to Admin / Doctor
//                     </a>
//                 </div>

//                 {/* Patient Panel Card */}
//                 <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between hover:shadow-2xl transition">
//                     <div>
//                         <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//                             Patient Panel
//                         </h2>
//                         <p className="text-gray-500 mb-6">
//                             Book appointments, manage your profile, and check your history.
//                         </p>
//                     </div>
//                     <Link
//                         to="/home"
//                         className="inline-block text-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
//                     >
//                         Go to Patient
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }







// // src/pages/ChoosePortal.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function ChoosePortal() {
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
//             <h1 className="text-4xl font-bold mb-12 text-gray-800">
//                 Choose Your Portal
//             </h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
//                 {/* Admin/Doctor Panel */}
//                 <div
//                     className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition h-96"
//                     style={{
//                         backgroundImage:
//                             "url('https://plus.unsplash.com/premium_photo-1752073513172-f164f05848f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D')",
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                     }}
//                 >
//                     <div className="absolute inset-0 flex flex-col justify-between p-8">
//                         <div>
//                             <h2 className="text-3xl font-bold text-white mb-3">
//                                 Admin / Doctor Panel
//                             </h2>
//                             <p className="text-gray-200">
//                                 Manage appointments, doctor dashboards, and admin controls.
//                             </p>
//                         </div>
//                         <a
//                             href="http://localhost:5174/"
//                             className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
//                         >
//                             Go to Admin / Doctor
//                         </a>
//                     </div>
//                 </div>

//                 {/* Patient Panel */}
//                 <div
//                     className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition h-96"
//                     style={{
//                         backgroundImage:
//                             "url('https://images.unsplash.com/photo-1639154968821-6dbc3efb8d23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D')",
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                     }}
//                 >
//                     <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-8">
//                         <div>
//                             <h2 className="text-3xl font-bold text-white mb-3">
//                                 Patient Panel
//                             </h2>
//                             <p className="text-gray-200">
//                                 Book appointments, manage your profile, and track your history.
//                             </p>
//                         </div>
//                         <Link
//                             to="/home"
//                             className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
//                         >
//                             Go to Patient
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// src/pages/ChoosePortal.jsx
// Note: This component uses react-router-dom which needs to be installed in your project
// For the artifact preview, Link is replaced with a regular anchor tag



// import React, { useState } from "react";
// import { Stethoscope, User, ArrowRight, Shield, Calendar, Activity } from "lucide-react";

// export default function ChoosePortal() {
//     const [hoveredCard, setHoveredCard] = useState(null);

//     return (
//         <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//             {/* Animated Background Elements */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//                 <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
//                 <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
//             </div>

//             {/* Grid Pattern Overlay */}
//             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

//             <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
//                 {/* Header */}
//                 <div className="text-center mb-16">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl mb-6 shadow-lg shadow-blue-500/50">
//                         <Activity className="w-10 h-10 text-white" />
//                     </div>
//                     <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent">
//                         Choose Your Portal
//                     </h1>
//                     <p className="text-xl text-blue-200 max-w-2xl mx-auto">
//                         Select the portal that matches your role to access your personalized dashboard
//                     </p>
//                 </div>

//                 {/* Portal Cards */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
//                     {/* Admin/Doctor Panel */}
//                     <div
//                         className="group relative"
//                         onMouseEnter={() => setHoveredCard('admin')}
//                         onMouseLeave={() => setHoveredCard(null)}
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

//                         <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 h-[450px] flex flex-col justify-between overflow-hidden shadow-2xl">
//                             {/* Decorative Elements */}
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

//                             {/* Icon */}
//                             <div className="relative z-10">
//                                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
//                                     <Stethoscope className="w-8 h-8 text-white" />
//                                 </div>

//                                 <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
//                                     Admin / Doctor Panel
//                                 </h2>

//                                 <p className="text-blue-200 mb-6 leading-relaxed">
//                                     Access comprehensive management tools, doctor dashboard, schedule handling, and administrative controls.
//                                 </p>

//                                 {/* Features */}
//                                 <div className="space-y-3 mb-6">
//                                     <div className="flex items-center text-blue-100">
//                                         <Shield className="w-5 h-5 mr-3 text-blue-400" />
//                                         <span className="text-sm">Advanced Access Controls</span>
//                                     </div>
//                                     <div className="flex items-center text-blue-100">
//                                         <Calendar className="w-5 h-5 mr-3 text-blue-400" />
//                                         <span className="text-sm">Appointment Management</span>
//                                     </div>
//                                     <div className="flex items-center text-blue-100">
//                                         <Activity className="w-5 h-5 mr-3 text-blue-400" />
//                                         <span className="text-sm">Analytics Dashboard</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Button */}
//                             <a
//                                 href="http://localhost:5174/"
//                                 className="relative z-10 group/btn flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/60 hover:scale-105"
//                             >
//                                 <span>Go to Admin / Doctor</span>
//                                 <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//                             </a>
//                         </div>
//                     </div>

//                     {/* Patient Panel */}
//                     <div
//                         className="group relative"
//                         onMouseEnter={() => setHoveredCard('patient')}
//                         onMouseLeave={() => setHoveredCard(null)}
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

//                         <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-teal-500/20 rounded-3xl p-8 h-[450px] flex flex-col justify-between overflow-hidden shadow-2xl">
//                             {/* Decorative Elements */}
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

//                             {/* Icon */}
//                             <div className="relative z-10">
//                                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl mb-6 shadow-lg shadow-teal-500/50 group-hover:scale-110 transition-transform duration-300">
//                                     <User className="w-8 h-8 text-white" />
//                                 </div>

//                                 <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors">
//                                     Patient Panel
//                                 </h2>

//                                 <p className="text-teal-200 mb-6 leading-relaxed">
//                                     Book appointments easily, manage your profile, track medical history, and stay connected with your healthcare.
//                                 </p>

//                                 {/* Features */}
//                                 <div className="space-y-3 mb-6">
//                                     <div className="flex items-center text-teal-100">
//                                         <Calendar className="w-5 h-5 mr-3 text-teal-400" />
//                                         <span className="text-sm">Easy Appointment Booking</span>
//                                     </div>
//                                     <div className="flex items-center text-teal-100">
//                                         <User className="w-5 h-5 mr-3 text-teal-400" />
//                                         <span className="text-sm">Profile Management</span>
//                                     </div>
//                                     <div className="flex items-center text-teal-100">
//                                         <Activity className="w-5 h-5 mr-3 text-teal-400" />
//                                         <span className="text-sm">Medical History Tracking</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Button */}
//                             <a
//                                 href="/home"
//                                 className="relative z-10 group/btn flex items-center justify-center bg-gradient-to-r from-teal-600 to-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-teal-500 hover:to-green-400 transition-all duration-300 shadow-lg shadow-teal-500/50 hover:shadow-teal-400/60 hover:scale-105"
//                             >
//                                 <span>Go to Patient</span>
//                                 <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer Text */}
//                 <div className="mt-12 text-center">
//                     <p className="text-blue-300 text-sm">
//                         Secure • HIPAA Compliant • 24/7 Support
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from "react";
import {
    Stethoscope,
    User,
    ArrowRight,
    Activity,
    Calendar,
    Shield,
} from "lucide-react";

export default function ChoosePortal() {
    return (
        <div className="min-h-screen w-full bg-[#f5f7fb] text-slate-900">
            {/* Top Navbar */}
            <header className="w-full bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div className="leading-tight">
                            <p className="font-semibold tracking-tight text-slate-900">
                                Doc <span className="text-cyan-600">Flow</span>
                            </p>
                            <p className="text-[11px] text-slate-500">
                                Smart Healthcare Platform
                            </p>
                        </div>
                    </div>

                    <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                        {/* <span className="hover:text-cyan-600 cursor-pointer">Home</span>
                        <span className="hover:text-cyan-600 cursor-pointer">Doctors</span>
                        <span className="hover:text-cyan-600 cursor-pointer">About</span>
                        <span className="hover:text-cyan-600 cursor-pointer">Contact</span> */}
                    </nav>
                </div>
            </header>

            {/* Main Section */}
            <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Hero Text */}
                    <section>
                        <span className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 mb-4">
                            Seamless access for doctors & patients
                        </span>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                            Choose the portal that{" "}
                            <span className="text-cyan-600">matches your role</span>
                        </h1>

                        <p className="text-slate-600 text-sm md:text-base mb-6 max-w-xl">
                            Whether you are a healthcare professional or a patient, Medi
                            Connect gives you a tailored experience for appointments,
                            records, and communication.
                        </p>

                        <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                Secure & encrypted data
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-cyan-500" />
                                Smart appointment system
                            </span>
                        </div>
                    </section>

                    {/* Portal Cards */}
                    <section className="space-y-5">
                        {/* Admin / Doctor Card */}
                        <div className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500" />
                            <div className="p-5 md:p-6 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                        <Stethoscope className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                                            Admin / Doctor Panel
                                        </h2>
                                        <p className="text-xs md:text-sm text-slate-600 mt-1">
                                            Manage appointments, schedules, and patient information
                                            with powerful admin tools and insights.
                                        </p>
                                    </div>
                                </div>

                                <ul className="text-xs md:text-sm text-slate-600 space-y-1.5 mt-1">
                                    <li className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-cyan-500" />
                                        <span>Role-based access & security</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-cyan-500" />
                                        <span>Appointment & schedule management</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-cyan-500" />
                                        <span>Analytics & doctor performance overview</span>
                                    </li>
                                </ul>

                                <div className="pt-1">
                                    <a
                                        href="http://localhost:5174/"
                                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium px-5 py-2.5 hover:from-cyan-500 hover:to-blue-500 transition-all group"
                                    >
                                        Go to Admin / Doctor
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Patient Card */}
                        <div className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500" />
                            <div className="p-5 md:p-6 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                                            Patient Panel
                                        </h2>
                                        <p className="text-xs md:text-sm text-slate-600 mt-1">
                                            Book appointments, manage your profile, and keep track of
                                            your medical history in one place.
                                        </p>
                                    </div>
                                </div>

                                <ul className="text-xs md:text-sm text-slate-600 space-y-1.5 mt-1">
                                    <li className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-emerald-500" />
                                        <span>Easy appointment booking</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-emerald-500" />
                                        <span>Simple profile & reports management</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        <span>View visit history & prescriptions</span>
                                    </li>
                                </ul>

                                <div className="pt-1">
                                    <a
                                        href="/home"
                                        className="inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-400 transition-all group"
                                    >
                                        Go to Patient
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Small footer text */}
                <p className="mt-10 text-center text-[11px] md:text-xs text-slate-500">
                    Secure • HIPAA Compliant • 24/7 Support
                </p>
            </main>
        </div>
    );
}
