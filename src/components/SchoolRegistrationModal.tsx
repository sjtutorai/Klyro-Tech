import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Users,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  ShieldAlert,
  Upload,
  FileText,
  Download,
  Mail,
  User,
  School as SchoolIcon,
  BookOpen,
  AlertCircle,
  FileSpreadsheet,
  RotateCcw,
  Globe,
  Phone,
  MapPin,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';
import { dataService } from '../services/dataService';

interface SchoolRegistrationModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onComplete?: (regNumber: string, udiseCode: string) => void;
  onSuccess?: (school: any, tempPassword: string) => void;
}

const ALL_CLASS_OPTIONS = [
  'Pre-KG',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const BOARD_OPTIONS = [
  'CBSE (Central Board of Secondary Education)',
  'ICSE / ISC (Council for Indian School Certificate)',
  'State Board',
  'IB (International Baccalaureate)',
  'IGCSE / Cambridge',
  'Other / Independent',
];

const SAMPLE_CSV_DATA = `Name,Email,Phone,EmployeeID,Subject,Qualification,Classes,Sections
Mrs. Ananya Sen,ananya.maths@school.edu.in,+91 98111 22334,EMP-101,Mathematics,M.Sc B.Ed,"6,7,8","A,B"
Mr. David Miller,david.physics@school.edu.in,+91 98111 22335,EMP-102,Physics,M.Tech B.Ed,"9,10,11","A,B,C"
Mrs. Kavita Rao,kavita.chem@school.edu.in,+91 98111 22336,EMP-103,Chemistry,Ph.D Chemistry,"11,12","A,B"
Mr. Suresh Kumar,suresh.cs@school.edu.in,+91 98111 22337,EMP-104,Computer Science,M.CA,"6,7,8,9,10","A,B,C"
Mrs. Rekha Sharma,rekha.hindi@school.edu.in,+91 98111 22338,EMP-105,Hindi,M.A. B.Ed,"1,2,3,4,5","A,B"`;

const DRAFT_STORAGE_KEY = 'klyro_school_reg_draft_v2';

export const SchoolRegistrationModal: React.FC<SchoolRegistrationModalProps> = ({
  isOpen = true,
  onClose,
  onComplete,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: School Info State
  const [schoolDetails, setSchoolDetails] = useState({
    name: '',
    udiseCode: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    website: '',
    logoUrl: '',
  });

  // Step 1: Academic Details State
  const [academicDetails, setAcademicDetails] = useState({
    academicYear: '2026-2027',
    board: 'CBSE (Central Board of Secondary Education)',
    classesAvailable: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    totalSections: '4',
    totalStudentsApprox: '',
    totalTeachersApprox: '',
  });

  // Step 2: Principal State
  const [principalInfo, setPrincipalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Principal',
    photoUrl: '',
  });

  // Step 3: Teachers List State
  const [teachers, setTeachers] = useState<Omit<Teacher, 'id' | 'schoolId' | 'createdAt'>[]>([]);

  // Step 3: Inline Teacher Form State
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    subject: 'Mathematics',
    qualification: '',
    classes: '',
    sections: '',
  });
  const [editingTeacherIndex, setEditingTeacherIndex] = useState<number | null>(null);

  // Step 4: Confirmation State
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 5: Result State
  const [registrationResult, setRegistrationResult] = useState<{
    registerNumber: string;
    tempPassword: string;
    schoolName: string;
  } | null>(null);

  // UI / Copy States
  const [copiedRegNum, setCopiedRegNum] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [emailSentToast, setEmailSentToast] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);

  // CSV Import Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [csvText, setCsvText] = useState('');

  // Load / Save Draft in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schoolDetails && parsed.schoolDetails.name && parsed.schoolDetails.name !== 'National Public School') {
          setSchoolDetails(parsed.schoolDetails);
          if (parsed.academicDetails) setAcademicDetails(parsed.academicDetails);
          if (parsed.principalInfo) setPrincipalInfo(parsed.principalInfo);
          if (parsed.teachers) setTeachers(parsed.teachers);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveDraft = () => {
    try {
      const draft = { schoolDetails, academicDetails, principalInfo, teachers };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    } catch {
      // ignore
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setDraftSaved(false);
  };

  if (!isOpen) return null;

  // Step 1 Validation
  const validateStep1 = () => {
    setValidationError(null);
    if (!schoolDetails.name.trim()) return 'School Name is required.';
    if (!schoolDetails.udiseCode.trim()) return 'UDISE Code is required.';
    if (schoolDetails.udiseCode.trim().length < 8) return 'UDISE Code must be at least 8 to 11 digits.';
    if (dataService.isUdiseCodeTaken(schoolDetails.udiseCode)) {
      return `UDISE Code '${schoolDetails.udiseCode}' is already registered with another school.`;
    }

    if (!schoolDetails.email.trim() || !schoolDetails.email.includes('@')) {
      return 'Valid School Email address is required.';
    }
    if (dataService.isSchoolEmailTaken(schoolDetails.email)) {
      return `School Email '${schoolDetails.email}' is already registered in Klyro Tech.`;
    }

    if (!schoolDetails.phone.trim()) return 'School Phone Number is required.';
    if (!schoolDetails.address.trim()) return 'School Address is required.';
    if (!schoolDetails.district.trim()) return 'District is required.';
    if (!schoolDetails.state.trim()) return 'State is required.';
    if (!schoolDetails.pincode.trim() || schoolDetails.pincode.trim().length < 5) {
      return 'Valid Pincode is required.';
    }

    if (!academicDetails.academicYear) return 'Academic Year is required.';
    if (!academicDetails.board) return 'School Board is required.';
    if (academicDetails.classesAvailable.length === 0) {
      return 'Please select at least one class available in your school.';
    }

    saveDraft();
    return null;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    setValidationError(null);
    if (!principalInfo.name.trim()) return 'Principal Name is required.';
    if (!principalInfo.email.trim() || !principalInfo.email.includes('@')) {
      return 'Valid Principal Email address is required.';
    }
    if (dataService.isPrincipalEmailTaken(principalInfo.email)) {
      return `Principal Email '${principalInfo.email}' is already registered in Klyro Tech.`;
    }
    if (principalInfo.email.trim().toLowerCase() === schoolDetails.email.trim().toLowerCase()) {
      return 'Principal Email should ideally be unique from School General Admin Email.';
    }

    if (!principalInfo.phone.trim()) return 'Principal Phone Number is required.';
    if (!principalInfo.designation.trim()) return 'Principal Designation is required.';

    saveDraft();
    return null;
  };

  // Step 3 Teacher Add / Edit
  const handleAddOrUpdateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!newTeacher.name.trim()) {
      setValidationError('Teacher Name is required.');
      return;
    }
    if (!newTeacher.email.trim() || !newTeacher.email.includes('@')) {
      setValidationError('Valid Teacher Email address is required.');
      return;
    }

    // Check duplicate email within list
    const lowerEmail = newTeacher.email.trim().toLowerCase();
    const dupInList = teachers.some(
      (t, i) => i !== editingTeacherIndex && t.email.trim().toLowerCase() === lowerEmail
    );
    if (dupInList) {
      setValidationError(`Teacher email '${newTeacher.email}' is already added to this registration list.`);
      return;
    }

    // Check duplicate employee ID within list
    if (newTeacher.employeeId.trim()) {
      const lowerEmp = newTeacher.employeeId.trim().toLowerCase();
      const dupEmp = teachers.some(
        (t, i) => i !== editingTeacherIndex && t.employeeId.trim().toLowerCase() === lowerEmp
      );
      if (dupEmp) {
        setValidationError(`Employee ID '${newTeacher.employeeId}' is already assigned to another teacher.`);
        return;
      }
    }

    const formattedTeacher: Omit<Teacher, 'id' | 'schoolId' | 'createdAt'> = {
      name: newTeacher.name.trim(),
      email: newTeacher.email.trim(),
      phone: newTeacher.phone.trim() || '+91 90000 00000',
      employeeId: newTeacher.employeeId.trim() || `EMP-${teachers.length + 101}`,
      subject: newTeacher.subject.trim() || 'General',
      qualification: newTeacher.qualification.trim() || 'B.Ed',
      classesAssigned: newTeacher.classes.split(',').map((c) => c.trim()).filter(Boolean),
      sectionsAssigned: newTeacher.sections.split(',').map((s) => s.trim()).filter(Boolean),
    };

    if (editingTeacherIndex !== null) {
      const updated = [...teachers];
      updated[editingTeacherIndex] = formattedTeacher;
      setTeachers(updated);
      setEditingTeacherIndex(null);
    } else {
      setTeachers([...teachers, formattedTeacher]);
    }

    setNewTeacher({
      name: '',
      email: '',
      phone: '',
      employeeId: '',
      subject: 'Mathematics',
      qualification: '',
      classes: '6,7,8',
      sections: 'A,B',
    });

    saveDraft();
  };

  const handleEditTeacherClick = (index: number) => {
    const t = teachers[index];
    setNewTeacher({
      name: t.name,
      email: t.email,
      phone: t.phone,
      employeeId: t.employeeId,
      subject: t.subject,
      qualification: t.qualification,
      classes: t.classesAssigned.join(','),
      sections: t.sectionsAssigned.join(','),
    });
    setEditingTeacherIndex(index);
  };

  const handleRemoveTeacher = (index: number) => {
    setTeachers(teachers.filter((_, i) => i !== index));
    saveDraft();
  };

  // CSV Import Parser
  const handleParseCsv = () => {
    setValidationError(null);
    if (!csvText.trim()) {
      setValidationError('Please paste CSV text or select sample CSV data.');
      return;
    }

    const lines = csvText.trim().split('\n');
    const parsedTeachers: Omit<Teacher, 'id' | 'schoolId' | 'createdAt'>[] = [];

    lines.forEach((line, idx) => {
      // Skip header line if present
      if (idx === 0 && (line.toLowerCase().includes('name') || line.toLowerCase().includes('email'))) {
        return;
      }
      const parts = line.split(',').map((p) => p.replace(/"/g, '').trim());
      if (parts.length >= 2 && parts[0] && parts[1]) {
        parsedTeachers.push({
          name: parts[0],
          email: parts[1],
          phone: parts[2] || '+91 98000 00000',
          employeeId: parts[3] || `EMP-${teachers.length + parsedTeachers.length + 101}`,
          subject: parts[4] || 'General',
          qualification: parts[5] || 'B.Ed',
          classesAssigned: (parts[6] || '6,7,8').split(';').map((c) => c.trim()),
          sectionsAssigned: (parts[7] || 'A,B').split(';').map((s) => s.trim()),
        });
      }
    });

    if (parsedTeachers.length === 0) {
      setValidationError('Could not parse valid teacher records from CSV. Check format.');
      return;
    }

    setTeachers([...teachers, ...parsedTeachers]);
    setShowImportModal(false);
    setCsvText('');
    saveDraft();
  };

  const handleDownloadCsvTemplate = () => {
    const blob = new Blob([SAMPLE_CSV_DATA], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Klyro_Tech_Teacher_Registration_Template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Step 3 Validation before Step 4 Review
  const validateStep3 = () => {
    setValidationError(null);
    if (teachers.length === 0) {
      setValidationError('At least 1 teacher must be registered before proceeding to review.');
      return false;
    }
    saveDraft();
    return true;
  };

  // Final Submission
  const handleCompleteRegistration = () => {
    if (!isConfirmed) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const result = dataService.registerSchool(
        {
          name: schoolDetails.name,
          udiseCode: schoolDetails.udiseCode,
          email: schoolDetails.email,
          phone: schoolDetails.phone,
          address: schoolDetails.address,
          district: schoolDetails.district,
          state: schoolDetails.state,
          pincode: schoolDetails.pincode,
          website: schoolDetails.website,
          logoUrl: schoolDetails.logoUrl,
          academicYear: academicDetails.academicYear,
          board: academicDetails.board,
          classesAvailable: academicDetails.classesAvailable,
          totalSections: parseInt(academicDetails.totalSections) || 4,
          principalName: principalInfo.name,
          principalEmail: principalInfo.email,
          principalPhone: principalInfo.phone,
          principalDesignation: principalInfo.designation,
          principalPhotoUrl: principalInfo.photoUrl,
        },
        teachers
      );

      clearDraft();

      setRegistrationResult({
        registerNumber: result.school.registerNumber,
        tempPassword: result.tempPassword,
        schoolName: result.school.name,
      });

      setIsSubmitting(false);
      setStep(5);

      // Fire Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 1200);
  };

  // Print / Download Receipt
  const handleDownloadReceipt = () => {
    const printContent = `
=====================================================
          KLYRO TECH DIGITAL CAMPUS PLATFORM
          SCHOOL ONBOARDING OFFICIAL RECEIPT
=====================================================

School Name:           ${schoolDetails.name}
School Register No:    ${registrationResult?.registerNumber}
UDISE Code:            ${schoolDetails.udiseCode}
School Email:          ${schoolDetails.email}
School Phone:          ${schoolDetails.phone}
Address:               ${schoolDetails.address}, ${schoolDetails.district}, ${schoolDetails.state} - ${schoolDetails.pincode}
Website:               ${schoolDetails.website || 'N/A'}

ACADEMIC DETAILS
-----------------------------------------------------
Academic Year:         ${academicDetails.academicYear}
School Board:          ${academicDetails.board}
Classes Offered:       ${academicDetails.classesAvailable.join(', ')}

PRINCIPAL / ADMINISTRATOR
-----------------------------------------------------
Principal Name:        ${principalInfo.name}
Principal Email:       ${principalInfo.email}
Principal Phone:       ${principalInfo.phone}
Designation:           ${principalInfo.designation}

LOGIN CREDENTIALS
-----------------------------------------------------
Portal Access URL:     Klyro Tech Digital Campus
School Register No:    ${registrationResult?.registerNumber}
Temporary Password:    ${registrationResult?.tempPassword} (UDISE Code)

Note: Please change the temporary password immediately upon first login.
Registered Teachers:   ${teachers.length} Faculty Members Onboarded
Timestamp:             ${new Date().toLocaleString()}
=====================================================
    Powered by VASCORE Labs • Connecting Every School
=====================================================
    `;

    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Klyro_Tech_Registration_Receipt_${registrationResult?.registerNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendEmailCredentials = () => {
    setEmailSentToast(true);
    setTimeout(() => setEmailSentToast(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200/80 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200">
              <SchoolIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Register Educational Institution
                </h2>
                {draftSaved && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 animate-pulse">
                    Auto-saved
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Step {step} of 5 — {step === 1 && 'School & Academic Details'}
                {step === 2 && 'Principal Administrator Information'}
                {step === 3 && 'Faculty & Teacher Onboarding'}
                {step === 4 && 'Final Review & Confirmation'}
                {step === 5 && 'Onboarding Complete'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/80 transition cursor-pointer"
            title="Close Wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Indicator Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
            <span className={step >= 1 ? 'text-indigo-600' : ''}>1. School Info</span>
            <span className={step >= 2 ? 'text-indigo-600' : ''}>2. Principal</span>
            <span className={step >= 3 ? 'text-indigo-600' : ''}>3. Teachers ({teachers.length})</span>
            <span className={step >= 4 ? 'text-indigo-600' : ''}>4. Review</span>
            <span className={step === 5 ? 'text-emerald-600' : ''}>5. Complete</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* Validation Alert Message */}
          {validationError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* ================= STEP 1: SCHOOL & ACADEMIC INFO ================= */}
          {step === 1 && (
            <div className="space-y-6">
              {/* School Details Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  School Details
                </h3>
                <span className="text-xs text-slate-500">* Required fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">School Name *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.name}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="e.g. National Public School"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">UDISE Code *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.udiseCode}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, udiseCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-mono"
                    placeholder="e.g. 29180108842"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">School Email *</label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={schoolDetails.email}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="admin@school.edu.in"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">School Phone *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.phone}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="+91 98000 00000"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">School Address *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.address}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="Street, Campus Address"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">District *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.district}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="e.g. Bengaluru Urban"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">State *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.state}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="e.g. Karnataka"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={schoolDetails.pincode}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="560038"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">School Website (Optional)</label>
                  <input
                    type="text"
                    value={schoolDetails.website}
                    onChange={(e) => setSchoolDetails({ ...schoolDetails, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="https://npscampus.edu.in"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">School Logo URL / Avatar</label>
                  <div className="flex items-center gap-2">
                    {schoolDetails.logoUrl && (
                      <img
                        src={schoolDetails.logoUrl}
                        alt="Logo"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    )}
                    <input
                      type="text"
                      value={schoolDetails.logoUrl}
                      onChange={(e) => setSchoolDetails({ ...schoolDetails, logoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="Image URL"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Details Section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Academic Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Academic Year *</label>
                    <select
                      value={academicDetails.academicYear}
                      onChange={(e) => setAcademicDetails({ ...academicDetails, academicYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    >
                      <option value="2026-2027">2026 - 2027</option>
                      <option value="2025-2026">2025 - 2026</option>
                      <option value="2027-2028">2027 - 2028</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">School Board *</label>
                    <select
                      value={academicDetails.board}
                      onChange={(e) => setAcademicDetails({ ...academicDetails, board: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    >
                      {BOARD_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Total Sections *</label>
                    <input
                      type="number"
                      min="1"
                      value={academicDetails.totalSections}
                      onChange={(e) => setAcademicDetails({ ...academicDetails, totalSections: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="e.g. 4"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Total Students (Approx.)</label>
                    <input
                      type="number"
                      value={academicDetails.totalStudentsApprox}
                      onChange={(e) => setAcademicDetails({ ...academicDetails, totalStudentsApprox: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="e.g. 1200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Total Teachers (Approx.)</label>
                    <input
                      type="number"
                      value={academicDetails.totalTeachersApprox}
                      onChange={(e) => setAcademicDetails({ ...academicDetails, totalTeachersApprox: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="e.g. 45"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-slate-700 font-semibold text-xs">
                      Classes Available * ({academicDetails.classesAvailable.length} Selected)
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setAcademicDetails({ ...academicDetails, classesAvailable: ALL_CLASS_OPTIONS })
                        }
                        className="text-[10px] text-indigo-600 font-bold hover:underline"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAcademicDetails({
                            ...academicDetails,
                            classesAvailable: ALL_CLASS_OPTIONS.filter((c) => !c.startsWith('Pre') && !c.startsWith('L') && !c.startsWith('U')),
                          })
                        }
                        className="text-[10px] text-indigo-600 font-bold hover:underline"
                      >
                        Classes 1-12
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    {ALL_CLASS_OPTIONS.map((cls) => {
                      const isSelected = academicDetails.classesAvailable.includes(cls);
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setAcademicDetails({
                                ...academicDetails,
                                classesAvailable: academicDetails.classesAvailable.filter((c) => c !== cls),
                              });
                            } else {
                              setAcademicDetails({
                                ...academicDetails,
                                classesAvailable: [...academicDetails.classesAvailable, cls],
                              });
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    const err = validateStep1();
                    if (!err) setStep(2);
                    else setValidationError(err);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-200 transition active:scale-95 cursor-pointer"
                >
                  <span>Step 2: Principal Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PRINCIPAL INFORMATION ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Principal Administrator Details
                </h3>
                <span className="text-xs text-slate-500">The principal will serve as school administrator</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Principal Name *</label>
                  <input
                    type="text"
                    required
                    value={principalInfo.name}
                    onChange={(e) => setPrincipalInfo({ ...principalInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="e.g. Dr. Vikramaditya Roy"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Principal Email Address *</label>
                  <input
                    type="email"
                    required
                    value={principalInfo.email}
                    onChange={(e) => setPrincipalInfo({ ...principalInfo, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="principal@school.edu.in"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Principal Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={principalInfo.phone}
                    onChange={(e) => setPrincipalInfo({ ...principalInfo, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="+91 98000 00000"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={principalInfo.designation}
                    onChange={(e) => setPrincipalInfo({ ...principalInfo, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    placeholder="Principal / Academic Director"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Photo URL / Profile Image (Optional)</label>
                  <div className="flex items-center gap-3">
                    {principalInfo.photoUrl && (
                      <img
                        src={principalInfo.photoUrl}
                        alt="Principal"
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 shrink-0"
                      />
                    )}
                    <input
                      type="text"
                      value={principalInfo.photoUrl}
                      onChange={(e) => setPrincipalInfo({ ...principalInfo, photoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to School Info</span>
                </button>

                <button
                  onClick={() => {
                    const err = validateStep2();
                    if (!err) setStep(3);
                    else setValidationError(err);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-200 transition active:scale-95 cursor-pointer"
                >
                  <span>Step 3: Faculty Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: TEACHER REGISTRATION ================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    Faculty Registration & Course Allocation
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Register teachers before completing onboarding. Only registered teacher emails will be authorized to log in.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowImportModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-200"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Import Excel / CSV</span>
                  </button>
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                    {teachers.length} Teachers Registered
                  </span>
                </div>
              </div>

              {/* Add / Edit Form Box */}
              <form
                onSubmit={handleAddOrUpdateTeacher}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-700 text-xs flex items-center gap-1.5">
                    {editingTeacherIndex !== null ? (
                      <>
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit Teacher Details
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        Add New Teacher to School Registry
                      </>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Teacher Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Priya"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="teacher@school.edu.in"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. English, Maths"
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Employee ID *</label>
                    <input
                      type="text"
                      placeholder="EMP-101"
                      value={newTeacher.employeeId}
                      onChange={(e) => setNewTeacher({ ...newTeacher, employeeId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+91 98765..."
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Qualification</label>
                    <input
                      type="text"
                      placeholder="M.A., B.Ed"
                      value={newTeacher.qualification}
                      onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Assigned Classes</label>
                    <input
                      type="text"
                      placeholder="6,7,8"
                      value={newTeacher.classes}
                      onChange={(e) => setNewTeacher({ ...newTeacher, classes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Assigned Sections</label>
                    <input
                      type="text"
                      placeholder="A,B,C"
                      value={newTeacher.sections}
                      onChange={(e) => setNewTeacher({ ...newTeacher, sections: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  {editingTeacherIndex !== null && (
                    <button
                      type="button"
                      onClick={() => setEditingTeacherIndex(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {editingTeacherIndex !== null ? 'Update Teacher' : 'Add Teacher'}
                  </button>
                </div>
              </form>

              {/* Registered Teachers Table */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Teacher Name & Email</th>
                      <th className="p-3.5">Subject</th>
                      <th className="p-3.5">Employee ID</th>
                      <th className="p-3.5">Assigned Classes</th>
                      <th className="p-3.5">Sections</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teachers.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900">{t.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{t.email}</div>
                        </td>
                        <td className="p-3.5 text-indigo-700 font-bold">{t.subject}</td>
                        <td className="p-3.5 font-mono text-slate-600">{t.employeeId}</td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {t.classesAssigned.map((c) => (
                              <span key={c} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                                Cls {c}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {t.sectionsAssigned.map((s) => (
                              <span key={s} className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
                                Sec {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleEditTeacherClick(idx)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                            title="Edit Teacher"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRemoveTeacher(idx)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                            title="Remove Teacher"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Principal Info</span>
                </button>

                <button
                  onClick={() => {
                    if (validateStep3()) setStep(4);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-200 transition active:scale-95 cursor-pointer"
                >
                  <span>Step 4: Review Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: REVIEW & CONFIRMATION ================= */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  Review School Registration Application
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify all details before submitting. Click edit on any card to update information.
                </p>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* School Information Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      School Details
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-1.5 text-slate-700">
                    <div>
                      <span className="text-slate-400">Name: </span>
                      <span className="font-bold text-slate-900">{schoolDetails.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">UDISE Code: </span>
                      <span className="font-mono font-bold text-indigo-700">{schoolDetails.udiseCode}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Email: </span>
                      <span>{schoolDetails.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Phone: </span>
                      <span>{schoolDetails.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Address: </span>
                      <span>
                        {schoolDetails.address}, {schoolDetails.district}, {schoolDetails.state} - {schoolDetails.pincode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Details Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      Academic & Board Details
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-1.5 text-slate-700">
                    <div>
                      <span className="text-slate-400">Academic Year: </span>
                      <span className="font-bold">{academicDetails.academicYear}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Board: </span>
                      <span className="font-semibold">{academicDetails.board}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Classes Offered: </span>
                      <span>{academicDetails.classesAvailable.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Sections Count: </span>
                      <span>{academicDetails.totalSections}</span>
                    </div>
                  </div>
                </div>

                {/* Principal Information Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-indigo-600" />
                      Principal Administrator
                    </span>
                    <button
                      onClick={() => setStep(2)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-1.5 text-slate-700">
                    <div>
                      <span className="text-slate-400">Name: </span>
                      <span className="font-bold text-slate-900">{principalInfo.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Email: </span>
                      <span className="font-mono">{principalInfo.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Phone: </span>
                      <span>{principalInfo.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Designation: </span>
                      <span>{principalInfo.designation}</span>
                    </div>
                  </div>
                </div>

                {/* Teachers Summary Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 relative space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Registered Faculty ({teachers.length})
                    </span>
                    <button
                      onClick={() => setStep(3)}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit List
                    </button>
                  </div>

                  <div className="max-h-28 overflow-y-auto space-y-1 pr-1">
                    {teachers.map((t, i) => (
                      <div key={i} className="flex items-center justify-between py-0.5 border-b border-slate-200/40 text-[11px]">
                        <span className="font-semibold text-slate-800">{t.name}</span>
                        <span className="text-indigo-600 font-semibold">{t.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="confirmCheck"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="confirmCheck" className="text-xs text-indigo-950 font-semibold cursor-pointer">
                  ☑ I confirm all information provided is accurate and authorized. Upon registration, Klyro Tech will generate official school register credentials and provision cloud database access.
                </label>
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Teachers</span>
                </button>

                <button
                  disabled={!isConfirmed || isSubmitting}
                  onClick={handleCompleteRegistration}
                  className={`px-8 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 shadow-lg transition duration-200 cursor-pointer ${
                    isConfirmed && !isSubmitting
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Provisioning School Infrastructure...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit & Register School Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 5: REGISTRATION COMPLETE ================= */}
          {step === 5 && registrationResult && (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border-2 border-emerald-200 mx-auto flex items-center justify-center shadow-lg shadow-emerald-100 animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  🎉 Onboarding Successful
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  School Registered Successfully!
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
                  <span className="font-bold text-slate-800">{registrationResult.schoolName}</span> has been provisioned on the Klyro Tech SaaS Digital Campus Cloud Network.
                </p>
              </div>

              {/* Generated Credentials Card */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-50 border border-slate-200/90 text-left space-y-4 shadow-xs">
                
                {/* Register Number Box */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">
                      School Register Number
                    </span>
                    <div className="text-xl font-black text-indigo-700 font-mono tracking-wider mt-0.5">
                      {registrationResult.registerNumber}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(registrationResult.registerNumber);
                      setCopiedRegNum(true);
                      setTimeout(() => setCopiedRegNum(false), 2000);
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 transition cursor-pointer"
                    title="Copy Register Number"
                  >
                    {copiedRegNum ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {/* Temporary Password Box */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">
                      Temporary Password (UDISE Code)
                    </span>
                    <div className="text-xl font-black text-amber-700 font-mono tracking-wider mt-0.5">
                      {registrationResult.tempPassword}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(registrationResult.tempPassword);
                      setCopiedPass(true);
                      setTimeout(() => setCopiedPass(false), 2000);
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-slate-700 hover:text-amber-600 transition cursor-pointer"
                    title="Copy Password"
                  >
                    {copiedPass ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Copy className="w-4.5 h-4.5" />}
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Important Security Notice:</span>
                    <span>Please save these credentials securely. The Principal must change the temporary password during first login.</span>
                  </div>
                </div>
              </div>

              {/* Email Sent Toast */}
              {emailSentToast && (
                <div className="max-w-md mx-auto p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>Credentials emailed to {principalInfo.email} successfully!</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onComplete) onComplete(registrationResult.registerNumber, registrationResult.tempPassword);
                    if (onSuccess) onSuccess({ name: registrationResult.schoolName, registerNumber: registrationResult.registerNumber }, registrationResult.tempPassword);
                  }}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-indigo-200 transition active:scale-95 cursor-pointer"
                >
                  <SchoolIcon className="w-4 h-4" />
                  <span>Go to Principal Login</span>
                </button>

                <button
                  onClick={handleDownloadReceipt}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-200 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>Download Registration Receipt</span>
                </button>

                <button
                  onClick={handleSendEmailCredentials}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-200 transition cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span>Send Email to Principal</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= CSV / EXCEL IMPORT MODAL ================= */}
      {showImportModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                Import Faculty List via CSV
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Paste comma-separated CSV text with columns: <br />
              <code className="text-indigo-600 font-mono text-[11px]">Name, Email, Phone, EmployeeID, Subject, Qualification, Classes, Sections</code>
            </p>

            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Paste CSV contents here..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-600"
            />

            <div className="flex items-center justify-between pt-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCsvText(SAMPLE_CSV_DATA)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition cursor-pointer text-[11px]"
                >
                  Load Sample Data (5 Teachers)
                </button>

                <button
                  type="button"
                  onClick={handleDownloadCsvTemplate}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer text-[11px]"
                >
                  Download Template
                </button>
              </div>

              <button
                type="button"
                onClick={handleParseCsv}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer"
              >
                Import Teachers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
