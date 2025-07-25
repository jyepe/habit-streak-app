import React, { useState } from "react";
import styles from "./CreateGroup.module.css";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const defaultIcons = [
  <GroupIcon />, <EmojiEventsIcon />, <FitnessCenterIcon />, <LocalDrinkIcon />
];

const frequencyOptions = [
  "Daily",
  "Weekly",
  "X times per week",
  "Custom"
];

const privacyOptions = [
  { value: "public", label: "Public (anyone can join)" },
  { value: "private", label: "Private (invite only)" },
  { value: "secret", label: "Secret (unlisted, invite only)" },
];

interface Habit {
  name: string;
  description: string;
  frequency: string;
  timesPerWeek?: number;
  startDate: Date | null;
  endDate?: Date | null;
}

const CreateGroup: React.FC = () => {
  // Step 1 state
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconIndex, setIconIndex] = useState(0);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // Step 2 state
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitForm, setHabitForm] = useState<Habit>({
    name: "",
    description: "",
    frequency: "Daily",
    timesPerWeek: 1,
    startDate: null,
    endDate: null
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Step 3 state
  const [privacy, setPrivacy] = useState("private");
  const [forfeit, setForfeit] = useState("");
  const [notifications, setNotifications] = useState(true);

  // Step 4 state
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const inviteLink = "https://habitapp.com/invite/ABC123"; // Placeholder
  const inviteCode = "ABC123";

  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Step 1: Next
  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  // Step 2: Add/Edit Habit
  const handleHabitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHabitForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (date: Date | null) => {
    setHabitForm((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setHabitForm((prev) => ({ ...prev, endDate: date }));
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitForm.name.trim() || !habitForm.startDate) return;
    if (editingIndex !== null) {
      setHabits((prev) => prev.map((h, i) => (i === editingIndex ? habitForm : h)));
      setEditingIndex(null);
    } else {
      setHabits((prev) => [...prev, habitForm]);
    }
    setHabitForm({ name: "", description: "", frequency: "Daily", timesPerWeek: 1, startDate: null, endDate: null });
  };

  const handleEditHabit = (idx: number) => {
    setHabitForm(habits[idx]);
    setEditingIndex(idx);
  };

  const handleRemoveHabit = (idx: number) => {
    setHabits((prev) => prev.filter((_, i) => i !== idx));
    if (editingIndex === idx) setEditingIndex(null);
  };



  // Step 3: Next
  const handleNextStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  // Step 4: Next
  const handleNextStep4 = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proceeding to next step (not implemented yet)");
  };

  // Step 4: Back
  const handleBackStep4 = () => setStep(3);

  const handleAddInviteEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail && !invitedEmails.includes(inviteEmail)) {
      setInvitedEmails(prev => [...prev, inviteEmail]);
      setInviteEmail("");
    }
  };

  const handleRemoveInviteEmail = (email: string) => {
    setInvitedEmails(prev => prev.filter(e => e !== email));
  };

  // Step 5: Back
  const handleBackStep5 = () => setStep(4);

  // Cancel handler
  const handleCancel = () => navigate("/groups");

  // Step 5: Create
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Group created! (No backend yet)");
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <form className={styles.form} onSubmit={handleNextStep1}>
          <h2>Create a Habit Group</h2>
          <label htmlFor="groupName">Group Name *</label>
          <input
            id="groupName"
            type="text"
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Morning Runners"
          />
          <label htmlFor="groupDesc">Group Description</label>
          <textarea
            id="groupDesc"
            className={styles.input}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What's your group's mission or vibe? (optional)"
            rows={3}
          />
          <div className={styles.iconSection}>
            <div className={styles.iconLabel}>Group Icon or Image</div>
            <div className={styles.iconChoices}>
              {defaultIcons.map((icon, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={iconIndex === idx && !customImage ? styles.selectedIcon : styles.iconBtn}
                  onClick={() => { setIconIndex(idx); setCustomImage(null); }}
                  aria-label={`Choose icon ${idx + 1}`}
                >
                  {icon}
                </button>
              ))}
              <label className={styles.iconBtn}>
                <AddAPhotoIcon />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {customImage && (
              <div className={styles.preview}><img src={customImage} alt="Custom group" /></div>
            )}
          </div>
          <div className={styles.stepButtonsRow}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button type="submit" className={styles.nextBtn} disabled={!name.trim()}>
              Next
            </button>
          </div>
        </form>
      )}
      {step === 2 && (
        <div className={styles.form}>
          <h2>Add Habits for Your Group</h2>
          <form className={styles.habitFormSection} onSubmit={handleAddHabit}>
            <label htmlFor="habitName">Habit Name *</label>
            <input
              id="habitName"
              name="name"
              type="text"
              className={styles.input}
              value={habitForm.name}
              onChange={handleHabitChange}
              required
              placeholder="e.g. Drink Water"
            />
            <label htmlFor="habitDesc">Description</label>
            <textarea
              id="habitDesc"
              name="description"
              className={styles.input}
              value={habitForm.description}
              onChange={handleHabitChange}
              placeholder="Describe the habit (optional)"
              rows={2}
            />
            <label htmlFor="habitFreq">Frequency *</label>
            <select
              id="habitFreq"
              name="frequency"
              className={styles.input}
              value={habitForm.frequency}
              onChange={handleHabitChange}
              required
            >
              {frequencyOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {habitForm.frequency === "X times per week" && (
              <input
                type="number"
                name="timesPerWeek"
                className={styles.input}
                min={1}
                max={7}
                value={habitForm.timesPerWeek || 1}
                onChange={handleHabitChange}
                placeholder="Times per week"
              />
            )}
            <label htmlFor="habitStart">Start Date *</label>
            <DatePicker
              id="habitStart"
              selected={habitForm.startDate}
              onChange={handleStartDateChange}
              className={styles.input}
              placeholderText="Select start date"
              dateFormat="yyyy-MM-dd"
              required
            />
            <label htmlFor="habitEnd">End Date</label>
            <DatePicker
              id="habitEnd"
              selected={habitForm.endDate}
              onChange={handleEndDateChange}
              className={styles.input}
              placeholderText="Select end date (optional)"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <button
              type="submit"
              className={styles.addHabitBtn}
              disabled={!habitForm.name.trim() || !habitForm.startDate}
            >
              {editingIndex !== null ? "Update Habit" : "Add Habit"}
            </button>
          </form>
          <div className={styles.habitsListSection}>
            <div className={styles.habitsListLabel}>Habits in this group:</div>
            <ul className={styles.habitsList}>
              {habits.map((habit, idx) => (
                <li key={idx} className={styles.habitItem}>
                  <div>
                    <span className={styles.habitName}>{habit.name}</span> <span className={styles.habitFreq}>({habit.frequency}{habit.frequency === "X times per week" && habit.timesPerWeek ? `: ${habit.timesPerWeek}x` : ""})</span>
                    <div className={styles.habitDates}>Start: {habit.startDate ? habit.startDate.toLocaleDateString() : ""}{habit.endDate ? `, End: ${habit.endDate.toLocaleDateString()}` : ""}</div>
                    {habit.description && <div className={styles.habitDesc}>{habit.description}</div>}
                  </div>
                  <div className={styles.habitActions}>
                    <button type="button" onClick={() => handleEditHabit(idx)}>Edit</button>
                    <button type="button" className={styles.deleteBtn} onClick={() => handleRemoveHabit(idx)}><DeleteIcon fontSize="small" /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.stepButtonsRow}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
            <button type="button" className={styles.nextBtn} disabled={habits.length === 0} onClick={() => setStep(3)}>
              Next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <form className={styles.form} onSubmit={handleNextStep3}>
          <h2>Privacy & Settings</h2>
          <label className={styles.sectionLabel}>Group Privacy *</label>
          <div className={styles.privacyOptions}>
            {privacyOptions.map(opt => (
              <label key={opt.value} className={styles.privacyOption}>
                <input
                  type="radio"
                  name="privacy"
                  value={opt.value}
                  checked={privacy === opt.value}
                  onChange={() => setPrivacy(opt.value)}
                  required
                />
                {opt.label}
              </label>
            ))}
          </div>
          <label htmlFor="forfeit">Forfeit System (optional)</label>
          <input
            id="forfeit"
            type="text"
            className={styles.input}
            value={forfeit}
            onChange={e => setForfeit(e.target.value)}
            placeholder="e.g. Fun challenge, group dare, donation, etc."
          />
          <label className={styles.sectionLabel}>Notifications</label>
          <label className={styles.notificationsToggle}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
            />
            Enable group notifications & reminders
          </label>
          <div className={styles.stepButtonsRow}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>Back</button>
            <button type="submit" className={styles.nextBtn}>Next</button>
          </div>
        </form>
      )}
      {step === 4 && (
        <form className={styles.form} onSubmit={handleNextStep4}>
          <h2>Invite Members</h2>
          <div className={styles.inviteSection}>
            <div className={styles.inviteLabel}>Invite Link</div>
            <div className={styles.inviteLink}>{inviteLink}</div>
            <div className={styles.inviteLabel}>Invite Code</div>
            <div className={styles.inviteCode}>{inviteCode}</div>
          </div>
          <label htmlFor="inviteEmail">Invite by Email</label>
          <div className={styles.inviteEmailRow}>
            <input
              id="inviteEmail"
              type="email"
              className={styles.input}
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="Enter email address"
            />
            <button
              type="button"
              className={styles.addInviteBtn}
              onClick={handleAddInviteEmail}
              disabled={!inviteEmail.trim() || invitedEmails.includes(inviteEmail)}
            >
              Add
            </button>
          </div>
          <ul className={styles.invitedEmailsList}>
            {invitedEmails.map(email => (
              <li key={email} className={styles.invitedEmailItem}>
                {email}
                <button type="button" onClick={() => handleRemoveInviteEmail(email)}>&times;</button>
              </li>
            ))}
          </ul>
          <div className={styles.stepButtonsRow}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button type="button" className={styles.backBtn} onClick={handleBackStep4}>Back</button>
            <button type="submit" className={styles.nextBtn}>Next</button>
          </div>
        </form>
      )}
      {step === 5 && (
        <form className={styles.form} onSubmit={handleCreateGroup}>
          <h2>Review & Create Group</h2>
          <div className={styles.reviewSection}>
            <div className={styles.reviewRow}><span className={styles.reviewLabel}>Group Name:</span> {name}</div>
            {description && <div className={styles.reviewRow}><span className={styles.reviewLabel}>Description:</span> {description}</div>}
            <div className={styles.reviewRow}><span className={styles.reviewLabel}>Icon/Image:</span> {customImage ? <img src={customImage} alt="Custom group" className={styles.reviewIconImg} /> : defaultIcons[iconIndex]}</div>
            <div className={styles.reviewRow}><span className={styles.reviewLabel}>Privacy:</span> {privacyOptions.find(opt => opt.value === privacy)?.label}</div>
            {forfeit && <div className={styles.reviewRow}><span className={styles.reviewLabel}>Forfeit:</span> {forfeit}</div>}
            <div className={styles.reviewRow}><span className={styles.reviewLabel}>Notifications:</span> {notifications ? "Enabled" : "Disabled"}</div>
            <div className={styles.reviewRow}><span className={styles.reviewLabel}>Habits:</span></div>
            <ul className={styles.reviewHabitsList}>
              {habits.map((habit, idx) => (
                <li key={idx} className={styles.reviewHabitItem}>
                  <b>{habit.name}</b> ({habit.frequency}{habit.frequency === "X times per week" && habit.timesPerWeek ? `: ${habit.timesPerWeek}x` : ""})<br />
                  <span className={styles.reviewHabitDates}>Start: {habit.startDate ? habit.startDate.toLocaleDateString() : ""}{habit.endDate ? `, End: ${habit.endDate.toLocaleDateString()}` : ""}</span>
                  {habit.description && <div className={styles.reviewHabitDesc}>{habit.description}</div>}
                </li>
              ))}
            </ul>
            <div className={styles.reviewRow}><span className={styles.reviewLabel}>Invited Emails:</span></div>
            <ul className={styles.reviewEmailsList}>
              {invitedEmails.length === 0 ? <li className={styles.reviewEmailItem}>None</li> : invitedEmails.map(email => (
                <li key={email} className={styles.reviewEmailItem}>{email}</li>
              ))}
            </ul>
          </div>
          <div className={styles.stepButtonsRow}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
            <button type="button" className={styles.backBtn} onClick={handleBackStep5}>Back</button>
            <button type="submit" className={styles.nextBtn}>Create Group</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateGroup; 