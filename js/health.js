// NOTE: Change this to "https://vaccicare-bk.vercel.app" when you deploy the updated backend
const BASE_URL = "http://localhost:8000";

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const month = urlParams.get('month') || 1; 

  const bannerText = document.querySelector('.hero-banner h2');
  if (bannerText) {
    bannerText.textContent = `Month ${month} Guidelines`;
  }
  
  // Element references in health.html
  const healthyEatingEl = document.getElementById('healthy-eating-content');
  const exerciseEl = document.getElementById('exercise-content');
  const dailyHabitsEl = document.getElementById('daily-habits-content');
  const mentalWeillbeingEl = document.getElementById('mental-weillbeing-content');

  // Fetch from the backend API
  fetch(`${BASE_URL}/guidelines/${month}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Guidelines not found for this month.');
      }
      return response.json();
    })
    .then(data => {
      if (healthyEatingEl) healthyEatingEl.innerHTML = formatText(data.healthy_eating);
      if (exerciseEl) exerciseEl.innerHTML = formatText(data.exercise_meditation);
      if (dailyHabitsEl) dailyHabitsEl.innerHTML = formatText(data.daily_habits);
      if (mentalWeillbeingEl) mentalWeillbeingEl.innerHTML = formatText(data.mental_wellbeing);
    })
    .catch(error => {
      console.error('Error fetching guidelines:', error);
      const errorMsg = '<ul><li>Data not available for this month yet.</li></ul>';
      if (healthyEatingEl) healthyEatingEl.innerHTML = errorMsg;
      if (exerciseEl) exerciseEl.innerHTML = errorMsg;
      if (dailyHabitsEl) dailyHabitsEl.innerHTML = errorMsg;
      if (mentalWeillbeingEl) mentalWeillbeingEl.innerHTML = errorMsg;
    });
});

function formatText(text) {
  if (!text) return '<ul><li>No guidelines available.</li></ul>';
  const points = text.split('\n').filter(p => p.trim() !== '');
  return `<ul>${points.map(p => `<li>${p.trim()}</li>`).join('')}</ul>`;
}
