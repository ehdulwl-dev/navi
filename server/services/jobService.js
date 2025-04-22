const supabase = require('../supabaseClient');

function formatJobData(raw) {
  return {
    id: raw.JO_REGIST_NO,
    company: raw.CMPNY_NM,
    title: raw.JO_SJ,
    description: raw.DTY_CN,
    summary: raw.GUI_LN,
    location: raw.BASS_ADRES_CN,
    work_address: raw.WORK_PARAR_BASS_ADRES_CN,
    wage: raw.HOPE_WAGE,
    employment_type: raw.EMPLYM_STLE_CMMN_MM,
    career_required: raw.CAREER_CND_NM,
    education_required: raw.ACDMCR_NM,
    work_time: raw.WORK_TIME_NM,
    holiday: raw.HOLIDAY_NM,
    week_hours: raw.WEEK_WORK_HR ? parseInt(raw.WEEK_WORK_HR) : null,
    insurance: raw.JO_FEINSR_SBSCRB_NM,
    receipt_close: raw.RCEPT_CLOS_NM,
    receipt_method: raw.RCEPT_MTH_NM,
    selection_method: raw.MODEL_MTH_NM,
    papers_required: raw.PRESENTN_PAPERS_NM,
    manager_name: raw.MNGR_NM,
    manager_phone: raw.MNGR_PHON_NO,
    manager_org: raw.MNGR_INSTT_NM,
    reg_date: raw.JO_REG_DT,
  };
}

async function upsertJobs(jobList) {
  for (const job of jobList) {
    const formatted = formatJobData(job);
    await supabase.from('TB_JOBS').upsert(formatted, { onConflict: ['id'] });
  }
  console.log(`[JOB] ${jobList.length}개 채용정보 upsert 완료`);
}

module.exports = upsertJobs;
