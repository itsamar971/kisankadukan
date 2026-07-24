import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Eye, EyeOff, ArrowRight, Leaf, ShoppingCart, Tractor,
  CheckCircle2, MapPin, Phone, Mail, User, FileText
} from 'lucide-react';

/* ── Role card ── */
function RoleCard({
  role, selected, onSelect, icon, title, perks
}: {
  role: 'buyer' | 'farmer';
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  perks: string[];
}) {
  return (
    <button
      type="button"
      className={`kkv2-role-card ${selected ? 'kkv2-role-card--active' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="kkv2-role-card-header">
        <div className={`kkv2-role-card-icon ${selected ? 'kkv2-role-card-icon--active' : ''}`}>
          {icon}
        </div>
        <div>
          <div className="kkv2-role-card-title">{title}</div>
          {selected && <div className="kkv2-role-card-badge">Selected</div>}
        </div>
        <div className={`kkv2-role-card-radio ${selected ? 'kkv2-role-card-radio--on' : ''}`}>
          {selected && <div className="kkv2-role-card-radio-dot" />}
        </div>
      </div>
      <ul className="kkv2-role-card-perks">
        {perks.map((p, i) => (
          <li key={i}>
            <CheckCircle2 size={12} />
            {p}
          </li>
        ))}
      </ul>
    </button>
  );
}

/* ── Step indicator ── */
function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="kkv2-step-dots">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`kkv2-step-dot ${i < current ? 'kkv2-step-dot--done' : ''} ${i === current ? 'kkv2-step-dot--active' : ''}`}
        />
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'buyer' | 'farmer'>('buyer');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0); // 0=role, 1=details, 2=security

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [landSurveyNumber, setLandSurveyNumber] = useState('');

  const totalSteps = 3;

  useEffect(() => { setMounted(true); }, []);

  const handleRoleChange = (newRole: 'buyer' | 'farmer') => {
    setRole(newRole);
    setEmail(''); setPassword(''); setFullName('');
    setMobile(''); setLocation(''); setLandSurveyNumber('');
    setError('');
  };

  const validateStep = () => {
    if (step === 0) return true;
    if (step === 1) {
      if (!fullName || !mobile || !location) { setError('Please fill in all required fields.'); return false; }
      if (role === 'farmer' && !landSurveyNumber) { setError('Please fill in your agriculture land survey number.'); return false; }
    }
    if (step === 2) {
      if (!email) { setError('Please enter your email address.'); return false; }
      if (!password || password.length < 6) { setError('Password must be at least 6 characters.'); return false; }
      if (!agreed) { setError('You must agree to our Terms of Service & Privacy Policy.'); return false; }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(s => Math.min(s + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setError('');
    setStep(s => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    const res = await register(email, password, role, {
      fullName, mobile, location,
      landSurveyNumber: role === 'farmer' ? landSurveyNumber : undefined,
    });
    if (res.success) navigate('/dashboard');
    else setError(res.error || 'Failed to create account.');
  };

  const isFinalStep = step === totalSteps - 1;
  const stepLabels = ['Choose Role', 'Your Details', 'Account Security'];

  return (
    <div className="uui-auth-root">
      <div className="uui-auth-card">

        {/* ══════════ LEFT FORM COLUMN ══════════ */}
        <div className="uui-auth-left uui-auth-left--scroll">
          {/* Top Logo */}
          <div className="uui-auth-brand">
            <span className="uui-brand-dot" />
            <span className="uui-brand-text">KisanKaDukan</span>
          </div>

          {/* Form Content */}
          <div className="uui-form-box">
            <div className="uui-form-header">
              <h1 className="uui-form-title">Create an account</h1>
              <p className="uui-form-sub">Start your direct farm trade journey today.</p>
            </div>

            {/* Step indicator */}
            <div className="uui-step-bar">
              <StepDots total={totalSteps} current={step} />
              <span className="uui-step-label">Step {step + 1} of {totalSteps}: {stepLabels[step]}</span>
            </div>

            {/* ── STEP 0: ROLE ── */}
            {step === 0 && (
              <div className="uui-step-content">
                <p className="uui-label">I want to join as a…</p>
                <div className="uui-role-grid">
                  <button
                    type="button"
                    className={`uui-role-btn ${role === 'buyer' ? 'uui-role-btn--active' : ''}`}
                    onClick={() => handleRoleChange('buyer')}
                  >
                    <div className="uui-role-icon"><ShoppingCart size={20} /></div>
                    <div>
                      <div className="uui-role-title">Buyer</div>
                      <div className="uui-role-sub">Browse fresh produce & buy directly</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`uui-role-btn ${role === 'farmer' ? 'uui-role-btn--active' : ''}`}
                    onClick={() => handleRoleChange('farmer')}
                  >
                    <div className="uui-role-icon"><Tractor size={20} /></div>
                    <div>
                      <div className="uui-role-title">Farmer</div>
                      <div className="uui-role-sub">List your harvest & reach buyers</div>
                    </div>
                  </button>
                </div>
                <button type="button" className="uui-btn-primary" onClick={handleNext}>
                  Continue as {role === 'buyer' ? 'Buyer' : 'Farmer'}
                </button>
              </div>
            )}

            {/* ── STEP 1: DETAILS ── */}
            {step === 1 && (
              <div className="uui-step-content">
                <div className="uui-form">
                  <div className="uui-field-group">
                    <label htmlFor="reg-fullname" className="uui-label">Full Name</label>
                    <input
                      id="reg-fullname"
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      onFocus={() => setFocused('fullName')}
                      onBlur={() => setFocused(null)}
                      className={`uui-input ${focused === 'fullName' ? 'uui-input--focused' : ''}`}
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div className="uui-field-group">
                    <label htmlFor="reg-mobile" className="uui-label">Mobile Number</label>
                    <input
                      id="reg-mobile"
                      type="tel"
                      value={mobile}
                      onChange={e => setMobile(e.target.value)}
                      onFocus={() => setFocused('mobile')}
                      onBlur={() => setFocused(null)}
                      className={`uui-input ${focused === 'mobile' ? 'uui-input--focused' : ''}`}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="uui-field-group">
                    <label htmlFor="reg-location" className="uui-label">
                      {role === 'buyer' ? 'City' : 'Farm Location'}
                    </label>
                    <input
                      id="reg-location"
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      onFocus={() => setFocused('location')}
                      onBlur={() => setFocused(null)}
                      className={`uui-input ${focused === 'location' ? 'uui-input--focused' : ''}`}
                      placeholder={role === 'buyer' ? 'e.g. Mumbai, Pune' : 'e.g. Village Takli, Nashik'}
                    />
                  </div>

                  {role === 'farmer' && (
                    <div className="uui-field-group">
                      <label htmlFor="reg-survey" className="uui-label">Land Survey Number</label>
                      <input
                        id="reg-survey"
                        type="text"
                        value={landSurveyNumber}
                        onChange={e => setLandSurveyNumber(e.target.value)}
                        onFocus={() => setFocused('landSurvey')}
                        onBlur={() => setFocused(null)}
                        className={`uui-input ${focused === 'landSurvey' ? 'uui-input--focused' : ''}`}
                        placeholder="e.g. 142/A-2"
                      />
                    </div>
                  )}

                  {error && <div className="uui-error-badge">{error}</div>}
                </div>

                <div className="uui-btn-row">
                  <button type="button" className="uui-btn-secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button type="button" className="uui-btn-primary" onClick={handleNext}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: SECURITY ── */}
            {step === 2 && (
              <form onSubmit={handleSubmit} noValidate className="uui-step-content">
                <div className="uui-form">
                  <div className="uui-field-group">
                    <label htmlFor="reg-email" className="uui-label">Email</label>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className={`uui-input ${focused === 'email' ? 'uui-input--focused' : ''}`}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="uui-field-group">
                    <label htmlFor="reg-password" className="uui-label">Password</label>
                    <div className="uui-input-wrap">
                      <input
                        id="reg-password"
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={() => setFocused('password')}
                        onBlur={() => setFocused(null)}
                        className={`uui-input uui-input--pr ${focused === 'password' ? 'uui-input--focused' : ''}`}
                        placeholder="Must be at least 6 characters"
                      />
                      <button
                        type="button"
                        className="uui-eye-btn"
                        onClick={() => setShowPw(v => !v)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                      >
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <label className="uui-checkbox-label" htmlFor="reg-terms">
                    <input
                      type="checkbox"
                      id="reg-terms"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                      className="uui-checkbox"
                    />
                    <span>I agree to the Terms & Privacy Policy</span>
                  </label>

                  {error && <div className="uui-error-badge">{error}</div>}
                </div>

                <div className="uui-btn-row">
                  <button type="button" className="uui-btn-secondary" onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="submit"
                    id="register-submit-btn"
                    disabled={isLoading}
                    className="uui-btn-primary"
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Redirect */}
            <p className="uui-bottom-text">
              Already have an account?{' '}
              <Link to="/login" className="uui-link-purple-bold">Sign in</Link>
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="uui-auth-footer">
            © KisanKaDukan 2026
          </div>
        </div>

        {/* ══════════ RIGHT MINIMAL GRAPHIC COLUMN ══════════ */}
        <div className="uui-auth-right">
          <div className="uui-art-wrap">
            <img src="/Group 2.svg" alt="KisanKaDukan illustration" className="uui-art-svg" />
          </div>
        </div>

      </div>
    </div>
  );
}
