# 🧪 Testing Guide - Weather-AI Dashboard

## Pre-Deployment Testing Checklist

Before submitting your deployment, verify all features work correctly.

---

## ✅ Weather Intelligence Tests

### Test 1: Pre-configured Cities
- [ ] Click "Nairobi" button
- [ ] Weather data loads within 3 seconds
- [ ] Current temperature displays
- [ ] AI summary appears in purple/blue box
- [ ] Humidity, wind speed, pressure show valid values
- [ ] Repeat for London, New York, Tokyo, Sydney

**Expected**: All cities load successfully with different data

### Test 2: Custom Coordinates
- [ ] Enter latitude: `-1.2921`
- [ ] Enter longitude: `36.8219`
- [ ] Click "Get Weather"
- [ ] Weather loads for Nairobi, Kenya
- [ ] Try invalid coordinates (e.g., lat: 999)

**Expected**: Valid coordinates work, invalid ones show error message

### Test 3: 7-Day Forecast
- [ ] Forecast cards show 7 days
- [ ] Each card displays high/low temperatures
- [ ] Weather conditions appear
- [ ] Temperature trend chart renders
- [ ] Precipitation bar chart displays

**Expected**: All visualizations render without errors

### Test 4: Error Handling
- [ ] Remove API key from `.env`
- [ ] Restart dev server
- [ ] Try to search weather
- [ ] Red error message appears
- [ ] Re-add API key and verify it works again

**Expected**: Graceful error handling with clear messages

---

## 🌳 Tree Analysis Tests

### Test 5: Image Upload - Valid Files
- [ ] Click tree analysis tab
- [ ] Upload a JPEG image (<20MB)
- [ ] Preview appears
- [ ] "Remove Image" button works
- [ ] Try PNG and WEBP formats

**Expected**: All formats accepted, preview displays correctly

### Test 6: Image Upload - Invalid Files
- [ ] Try uploading a PDF file
- [ ] Try uploading >20MB image
- [ ] Verify error messages appear

**Expected**: Proper validation with clear error messages

### Test 7: Form Metadata
- [ ] Upload valid image
- [ ] Fill Farmer ID: "F-TEST-001"
- [ ] Fill County: "Nairobi"
- [ ] Fill Land Acres: "5.5"
- [ ] Fill Location: "Test Farm"
- [ ] Fill Notes: "Sample test data"
- [ ] Click "Analyze Trees"

**Expected**: Form accepts all data and submits successfully

### Test 8: Analysis Results
After successful analysis:
- [ ] Tree count displays
- [ ] Density per acre shows
- [ ] Canopy coverage percentage appears
- [ ] Confidence score displays
- [ ] Health breakdown (healthy/needs care/replacement) renders
- [ ] AI observations list appears
- [ ] Recommendations list appears
- [ ] Original image displays
- [ ] Overlay/annotated image displays

**Expected**: All result components render with real data

### Test 9: Multiple Analyses
- [ ] Complete first analysis
- [ ] Click "New Analysis" button
- [ ] Form resets completely
- [ ] Upload different image
- [ ] Verify second analysis works

**Expected**: Clean state reset between analyses

---

## 📱 Responsive Design Tests

### Test 10: Mobile View
Open DevTools → Toggle device toolbar → Test on:
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)

**Check**:
- Tab buttons stack properly on mobile
- City buttons wrap to multiple rows
- Charts resize correctly
- Forms remain usable
- No horizontal scroll
- Text remains readable

**Expected**: App works seamlessly on all screen sizes

---

## ⚡ Performance Tests

### Test 11: Load Time
- [ ] Clear browser cache
- [ ] Reload page
- [ ] Page loads within 2 seconds
- [ ] No console errors
- [ ] All fonts/styles load correctly

**Expected**: Fast initial load with no errors

### Test 12: API Response Time
- [ ] Weather search completes in <3 seconds
- [ ] Tree analysis completes in <10 seconds
- [ ] No timeout errors

**Expected**: Reasonable response times based on API

---

## 🔍 Browser Compatibility

Test in multiple browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if on Mac)

**Check**:
- All features work
- Charts render correctly
- File upload works
- No console errors

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot read property 'temp' of undefined"
**Fix**: API response format changed. Check weatherAPI.js

### Issue: Charts don't render
**Fix**: 
```bash
npm install recharts --force
npm run dev
```

### Issue: Image upload fails with 413 error
**Fix**: Image too large. Compress or use different image

### Issue: AI summary doesn't appear
**Fix**: Check if `ai=true` parameter in API call

### Issue: Blank white screen
**Fix**: 
- Check browser console for errors
- Verify all imports in components
- Check .env file exists

---

## 📊 Test Data Suggestions

### Sample Coordinates
- **Nairobi, Kenya**: -1.2921, 36.8219
- **Your location**: Google "my coordinates"
- **Random ocean**: 0, -30 (should still work)
- **North Pole**: 90, 0
- **South Pole**: -90, 0

### Sample Images for Tree Analysis
1. **Google Earth**: Screenshot of forest/farm
2. **Free stock images**: Search "aerial view farm"
3. **Sample farm images**: 
   - Pexels.com (search "aerial farm")
   - Unsplash.com (search "drone agriculture")

---

## 🎯 Production Readiness Checklist

Before deploying:
- [ ] All tests above pass
- [ ] No console errors in production build
- [ ] .env file NOT committed to git
- [ ] README.md updated with your info
- [ ] GitHub repository is public
- [ ] All dependencies installed
- [ ] Build succeeds: `npm run build`
- [ ] Production preview works: `npm run preview`

---

## 📈 Post-Deployment Tests

After deploying to Netlify/Vercel:
- [ ] Visit deployed URL
- [ ] Test weather search
- [ ] Test tree analysis
- [ ] Check mobile responsiveness
- [ ] Verify no CORS errors
- [ ] Test in incognito/private window
- [ ] Share link with a friend to test

---

## 🔐 Security Checklist

- [ ] API key not visible in browser Network tab
- [ ] No sensitive data in console logs
- [ ] .env file in .gitignore
- [ ] No hardcoded credentials in code
- [ ] HTTPS enabled on deployment

---

## 📝 Testing Log Template

Use this to track your testing:

```
Date: ___________
Tester: ___________

Weather Intelligence: ☐ Pass ☐ Fail
Tree Analysis: ☐ Pass ☐ Fail
Responsive Design: ☐ Pass ☐ Fail
Performance: ☐ Pass ☐ Fail
Browser Compatibility: ☐ Pass ☐ Fail

Issues Found:
1. ___________
2. ___________
3. ___________

Fixed: ☐ Yes ☐ No

Ready for Deployment: ☐ Yes ☐ No
```

---

**After passing all tests**, proceed to [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions!
