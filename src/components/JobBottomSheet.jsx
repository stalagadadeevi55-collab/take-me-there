import { CheckCircle2, Navigation } from 'lucide-react';
import css from './JobBottomSheet.module.css';

export default function JobBottomSheet({ job }) {
  if (!job) return null;

  return (
    <div className={`glass-panel ${css.sheet}`}>
      <div className={css.header}>
        <div className={css.statusBadge}>Next Stop</div>
        <span className={css.eta}>ETA: {job.eta}</span>
      </div>
      
      <h2 className={css.address}>{job.address}</h2>
      <p className={css.notes}>{job.notes}</p>
      
      <div className={css.actions}>
        <button className={css.btnSecondary}>
          <Navigation size={18} />
          Navigate
        </button>
        <button className={css.btnPrimary}>
          <CheckCircle2 size={18} />
          Complete
        </button>
      </div>
    </div>
  );
}
