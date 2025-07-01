import React from 'react';
import { HeartHandshake, Star, TrendingUp } from 'lucide-react';

interface EducationItem {
  institution: string;
  degree: string;
  specialization: string;
  from: string;
  to: string;
}

interface HCPNode {
  id: string;
  name: string;
  specialty: string;
  location: string;
  avatar: string;
  bio?: string;
  about?: string;
  education?: EducationItem[];
  patientsServed?: number;
  successRate?: number;
  peers?: number;
  following?: number;
}

type Props = {
  hcp: HCPNode;
};

const HCPDetails: React.FC<Props> = ({ hcp }) => {
  return (
    <div className={`h-[470px] lg:h-[calc(100%-180px)] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${hcp ? 'pr-3' : 'pr-0'}`}>
        <div className="w-full h-[150px] bg-[#f2f2f2] rounded-t-2xl relative mb-15">
            <div className="w-[130px] h-[130px] rounded-[50%] bg-[#ccc] absolute m-auto left-0 right-0 bottom-[-50px] border-4 border-white">
                <img
                src={hcp.avatar}
                alt={hcp.name}
                className="w-[100%] rounded-full object-cover"
                />
            </div>
        </div>
        <div className="mb-3">
          <h2 className="text-[25px] font-semibold text-center mb-3">{hcp.name}</h2>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-[4px] font-medium text-sm bg-[#f0f7ff] text-gray-400">
                {hcp.specialty}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-[4px] font-medium text-sm bg-[#f0f7ff] text-gray-400">
                {hcp.location}
            </span>
          </div>
        </div>

        {hcp.bio && (
            <div className="mb-3">
                <p className="text-sm text-gray-700 text-center">{hcp.bio}</p>
            </div>
        )}

        <div className="flex items-center justify-center gap-4 mb-3">
          <div>
            <p className="mb-0 text-center text-gray-700 text-theme-xs dark:text-gray-400 sm:text-sm">Peers</p>
            <p className="flex items-center justify-center gap-1 text-theme-xs font-semibold text-gray-700 sm:text-lg">{hcp.peers || '0'}</p>
          </div>
          <div className="w-px bg-gray-200 h-9 dark:bg-gray-700"></div>
          <div>
            <p className="mb-0 text-center text-gray-700 text-theme-xs sm:text-sm">Following</p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-700 sm:text-lg">{hcp.following || '0'}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5 mb-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-7 py-2 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">View Profie</button>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg transition  px-7 py-2 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Resume</button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 mt-8 text-sm">
          <div>
            <div className="flex gap-2">
              <HeartHandshake size={18} color='#98a2b3' />
              <p className="text-gray-400">Patients Served</p>
            </div>
            <p className="text-[23px] font-bold">{hcp.patientsServed ?? '—'}</p>
            <p className="flex gap-1.5 text-[#32d583] text-[12px] items-center"><TrendingUp size={12} color='#32d583' /> +20</p>
          </div>
          <div>
            <div className="flex gap-2">
              <Star size={18} color='#98a2b3' />
              <p className="text-gray-400">Success Rate</p>
            </div>
            <p className="text-[23px] font-bold">{hcp.successRate ? `${hcp.successRate}%` : '—'}</p>
            <p className="flex gap-1.5 text-[#32d583] text-[12px] items-center"><TrendingUp size={12} color='#32d583' /> +5%</p>
          </div>
        </div>

        {hcp.about && (
            <div className="mb-5 mt-5">
                <h3 className="text-[16px] font-bold text-gray-800">About:</h3>
                <p className="text-sm text-gray-700">{hcp.about}</p>
            </div>
        )}

      

        {hcp.education && hcp.education.length > 0 && (
          <div>
            <h3 className="text-[16px] font-bold text-gray-800 mb-2">Education</h3>
            <ul className="list-none text-sm text-gray-700 space-y-1">
              {hcp.education.map((edu, index) => (
                <li key={index} className="mb-3">
                  <div className="flex gap-2">
                    <div className="w-[30px] h-[30px] rounded-[4px] bg-blue-500"></div>
                    <div>
                      <h4 className="text-gray-800 font-bold">{edu.institution}</h4>
                      <p>{edu.degree}</p>
                      <p>Specialization in {edu.specialization}</p>
                      <p>({edu.from} – {edu.to})</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default HCPDetails;
