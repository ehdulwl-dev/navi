const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// 전체 채용 공고 조회
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('TB_JOBS')
    .select('*')
    .order('reg_date', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

module.exports = router;
