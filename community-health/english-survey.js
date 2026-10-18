/* English presentation of the existing community survey.
 * Responses go straight to the existing Google Form through a native browser POST.
 * Google retains the original option values so the existing response sheet is unchanged.
 */
(function () {
  'use strict';
  const FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSfi9bib4uOn8O0qkKNK3hV13Z2Z3bV4BinsMtaDlhjxbS8aIg/';
  const POST_URL = FORM_BASE + 'formResponse?hl=en&embedded=true';
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const questions = [
    {
      entry: '1477466635',
      title: 'Were the information and the explanation of the situation clear to you?',
      choices: [
        ['واضحة ومفهومة', 'Clear and easy to understand'],
        ['تحتاج بعض التبسيط', 'Some parts need to be simpler'],
        ['غير واضحة لي', 'Not clear to me'],
        ['لم أقرأ أو أجرب بما يكفي', 'I have not read or tried enough to judge']
      ]
    },
    {
      entry: '1540221961',
      title: 'Did you find useful information or a practical step?',
      choices: [
        ['نعم، استفدت منها', 'Yes, it was useful to me'],
        ['قد تفيد شخصًا آخر أعرفه', 'It may help someone else I know'],
        ['فائدتها محدودة وتحتاج تطويرًا', 'Its usefulness is limited and needs improvement'],
        ['لا أستطيع التقييم بعد', 'I cannot judge yet']
      ]
    },
    {
      entry: '2046247497',
      title: 'How easy was it to read, navigate, and use the app?',
      choices: [
        ['سهل وواضح', 'Easy and clear'],
        ['مقبول مع بعض الصعوبة', 'Acceptable, with some difficulty'],
        ['صعب ويحتاج تحسينًا', 'Difficult and needs improvement'],
        ['لم أجرب بما يكفي', 'I have not tried enough to judge']
      ]
    }
  ];
  function render(context, inDialog) {
    const c = context && typeof context === 'object' ? context : { id: String(context || 'general') };
    const id = String(c.id || 'general');
    const contextTitle = String(c.title || 'Nursing for the Community');
    const heading = id === 'general' ? 'Your feedback on Nursing for the Community' : 'Your feedback on: ' + contextTitle;
    const contextValue = contextTitle + ' | Topic ID: ' + id + ' | Language: English';
    const fallback = FORM_BASE + 'viewform?hl=en&usp=pp_url&entry.1610240402=' + encodeURIComponent(contextValue);
    const h = inDialog ? '2' : '1';
    return `<section class="community-survey english" lang="en" dir="ltr" data-survey-context="${escapeHTML(id)}">
      <div class="page-head">
        <span class="label">Community health survey · You may participate more than once</span>
        <h${h} id="communitySurveyTitle" tabindex="-1">${escapeHTML(heading)}</h${h}>
        <p>Help the Faculty of Nursing, Tobruk University, improve technical performance, ease of use, and the clarity and usefulness of this content. Comments, corrections, criticism, and ideas are welcome.</p>
        <p>Participation is voluntary. Do not enter names, patient details, personal health information, usernames, or anyone else's identifying information in your feedback. You may provide your own email address or WhatsApp number only in the optional notification field below. This is not an emergency or medical-advice service.</p>
      </div>
      <div class="survey-frame-tools">
        <button type="button" id="newFeedback" class="button">Start another response</button>
        <a class="survey-open-link" href="${escapeHTML(fallback)}" target="_blank" rel="noopener noreferrer">Open the original Google Form if needed ↗</a>
      </div>
      <p class="survey-online-note">An internet connection is required to submit. Your answers are sent directly to this initiative's existing Google Form only when you select “Send my feedback”. They are not saved on this device. You may return and submit again after another topic or visit.</p>
      <form id="communityEnglishFeedbackForm" class="panel form-panel english-survey-form" data-community-english-survey="true" method="post" action="${escapeHTML(POST_URL)}" target="communityEnglishResponse" accept-charset="UTF-8" aria-describedby="communityEnglishSurveyPrivacy">
        <p class="form-note">The rating and written-feedback questions below are required; contact details are optional. For a written question with nothing to add, you can enter “No comment”.</p>
        <label class="field" for="communityEnglishSurveyContext">Topic or situation being reviewed</label>
        <textarea id="communityEnglishSurveyContext" name="entry.1610240402" rows="2" readonly required>${escapeHTML(contextValue)}</textarea>
        ${questions.map(question => `<fieldset><legend>${escapeHTML(question.title)} <span class="form-note">(Required)</span></legend>${question.choices.map((choice, index) => `<label class="radio-choice" for="communityEnglish-${question.entry}-${index}"><input id="communityEnglish-${question.entry}-${index}" type="radio" name="entry.${question.entry}" value="${escapeHTML(choice[0])}" required><span>${escapeHTML(choice[1])}</span></label>`).join('')}</fieldset>`).join('')}
        <label class="field" for="communityEnglishSurveyNote">What criticism, comment, or correction would you like to share? Include any technical problem you encountered. (Required)</label>
        <textarea id="communityEnglishSurveyNote" name="entry.1625888761" rows="4" required placeholder="Please do not include names or personal health details." aria-describedby="communityEnglishNoteHelp"></textarea>
        <p id="communityEnglishNoteHelp" class="form-note">If you have no additional comment, write “No comment”.</p>
        <label class="field" for="communityEnglishSurveySuggestion">What topic or idea would you like us to add or improve? (Required)</label>
        <textarea id="communityEnglishSurveySuggestion" name="entry.1677006881" rows="4" required placeholder="Your ideas for this topic or the app." aria-describedby="communityEnglishSuggestionHelp"></textarea>
        <p id="communityEnglishSuggestionHelp" class="form-note">If you have no additional comment, write “No comment”.</p>
        <label class="field" for="communityEnglishContact">Optional: leave an email address or WhatsApp number if you would like to be notified when your suggestion is implemented or your requested topic is added.</label>
        <input type="text" id="communityEnglishContact" name="entry.1353214146" maxlength="200" autocomplete="off" aria-describedby="communityEnglishContactHelp">
        <p id="communityEnglishContactHelp" class="form-note">Providing contact details means you agree to their use only for this notification. You may leave this blank and still submit feedback. Do not enter anyone else’s details; this is not for medical advice or follow-up.</p>
        <p id="communityEnglishSurveyPrivacy" class="form-note">By selecting “Send my feedback”, you agree to send these answers to the initiative team through Google Forms. Review your answers before sending. Check Google's confirmation or any error message below to verify receipt.</p>
        <button class="button primary" type="submit">Send my feedback</button>
      </form>
      <p id="communityEnglishSurveyStatus" class="survey-online-note" role="status" aria-live="polite">The form above is ready for your feedback. Nothing has been submitted.</p>
      <iframe id="communitySurveyFrame" name="communityEnglishResponse" class="community-survey-frame" title="Google Forms submission confirmation or errors" src="about:blank" hidden referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </section>`;
  }
  document.addEventListener('submit', function (event) {
    const form = event.target;
    if (!form || form.id !== 'communityEnglishFeedbackForm' || !form.hasAttribute('data-community-english-survey')) return;
    const section = form.closest('.community-survey');
    const status = section && section.querySelector('#communityEnglishSurveyStatus');
    const frame = section && section.querySelector('#communitySurveyFrame');
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      event.preventDefault();
      if (status) status.textContent = 'You appear to be offline. Reconnect to the internet, review your answers, and select “Send my feedback” again. Nothing has been sent by this attempt.';
      return;
    }
    if (frame) frame.hidden = false;
    if (status) status.textContent = 'Check Google’s confirmation or any error message below. Its Arabic confirmation means “Your contribution has reached the Nursing for the Community team. Thank you for your feedback and ideas.” If that confirmation is missing, receipt has not been verified. Choose “Start another response” to participate again.';
    // Do not prevent the normal POST, use fetch, or infer success from iframe load.
  });
  window.CommunityEnglishSurvey = Object.freeze({ render: render });
})();
