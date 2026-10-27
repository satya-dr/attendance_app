let currentLoginRole = 'student';
let currentUserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";
let html5QrCode = null;

// Active Class Geo-Coordinates (Configured by Teacher)
let classLocation = {
    lat: 26.3251,
    lng: 89.4582,
    radiusMeters: 100
};

let studentRoster = [
    { name: "Satyajit Roy", roll: "CSE/2024/042", dept: "CSE", sem: "5th Sem", year: "2024-2028", regNo: "REG2024001", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" }
];

let studentAttendanceLogs = [
    { subject: "Compiler Design (CS-501)", date: "24 Oct 2026", time: "10:15 AM", distance: "35m", status: "Present" }
];

let masterClassSessions = [];
let liveSessionAttendees = [];

// Handle Login Role
function setLoginRole(role) {
    currentLoginRole = role;
    const studentTab = document.getElementById('loginStudentTab');
    const teacherTab = document.getElementById('loginTeacherTab');
    const studentFields = document.getElementById('studentFields');
    const teacherFields = document.getElementById('teacherFields');

    if (role === 'student') {
        studentTab.className = "py-2.5 text-xs font-semibold rounded-xl transition-all bg-indigo-600 text-white shadow";
        teacherTab.className = "py-2.5 text-xs font-semibold rounded-xl transition-all text-slate-400 hover:text-white";
        studentFields.classList.remove('hidden');
        teacherFields.classList.add('hidden');
    } else {
        teacherTab.className = "py-2.5 text-xs font-semibold rounded-xl transition-all bg-indigo-600 text-white shadow";
        studentTab.className = "py-2.5 text-xs font-semibold rounded-xl transition-all text-slate-400 hover:text-white";
        teacherFields.classList.remove('hidden');
        studentFields.classList.add('hidden');
    }
}

function handleLogin() {
    const loginScreen = document.getElementById('loginScreen');
    const studentDash = document.getElementById('studentDashboard');
    const teacherDash = document.getElementById('teacherDashboard');
    const headerRoleBadge = document.getElementById('appHeaderRoleBadge');

    loginScreen.classList.add('hidden');

    if (currentLoginRole === 'student') {
        const name = document.getElementById('inputStudentName').value || "Student";
        const roll = document.getElementById('inputStudentRoll').value || "CSE/2024/000";

        document.getElementById('displayStudentName').innerText = name;
        document.getElementById('displayStudentRoll').innerText = `Roll: ${roll}`;
        document.getElementById('displayStudentAvatar').src = currentUserAvatar;

        document.getElementById('profileName').value = name;
        document.getElementById('profileRoll').value = roll;
        document.getElementById('profileModalAvatar').src = currentUserAvatar;
        document.getElementById('profileAvatarInput').value = currentUserAvatar;

        renderStudentDashboardLogs();

        studentDash.classList.remove('hidden');
        teacherDash.classList.add('hidden');
        headerRoleBadge.innerText = "Student Portal";
    } else {
        const teacherName = document.getElementById('inputTeacherName').value || "Faculty Member";
        document.getElementById('displayTeacherName').innerText = teacherName;

        teacherDash.classList.remove('hidden');
        studentDash.classList.add('hidden');
        headerRoleBadge.innerText = "Faculty Portal";

        renderTeacherMasterLogs();
    }
}

function logout() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
}

function openProfileModal() {
    document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.add('hidden');
}

function openHomeTab() {
    closeProfileModal();
}

function openLocationInfoPrompt() {
    alert(`Geo-Fence Notice:\nClasses enforce a strict ${classLocation.radiusMeters} meter radius from Lat: ${classLocation.lat}, Lng: ${classLocation.lng}.`);
}

function saveProfileChanges() {
    const newMobile = document.getElementById('profileMobile').value;
    const newEmail = document.getElementById('profileEmail').value;
    const newAvatarUrl = document.getElementById('profileAvatarInput').value;

    if (newAvatarUrl) {
        currentUserAvatar = newAvatarUrl;
        document.getElementById('displayStudentAvatar').src = currentUserAvatar;
        document.getElementById('profileModalAvatar').src = currentUserAvatar;
    }

    alert(`Profile updated successfully!\nMobile: ${newMobile}\nEmail: ${newEmail}`);
    closeProfileModal();
}

function updateClassLocation() {
    const lat = parseFloat(document.getElementById('teacherLatInput').value);
    const lng = parseFloat(document.getElementById('teacherLngInput').value);

    if (isNaN(lat) || isNaN(lng)) {
        alert('Please enter valid latitude and longitude numbers.');
        return;
    }

    classLocation.lat = lat;
    classLocation.lng = lng;
    alert('Class venue geo-coordinates updated successfully!');
}

function registerStudentByTeacher() {
    const name = document.getElementById('regName').value;
    const roll = document.getElementById('regRoll').value;
    const dept = document.getElementById('regDept').value;
    const sem = document.getElementById('regSem').value;
    const year = document.getElementById('regYear').value;
    const regNo = document.getElementById('regRegNo').value;

    if (!name || !roll || !dept || !sem || !year || !regNo) {
        alert('Please fill in all student registration fields.');
        return;
    }

    studentRoster.push({ name, roll, dept, sem, year, regNo, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" });
    document.getElementById('regName').value = '';
    document.getElementById('regRoll').value = '';
    document.getElementById('regDept').value = '';
    document.getElementById('regSem').value = '';
    document.getElementById('regYear').value = '';
    document.getElementById('regRegNo').value = '';

    alert(`Student ${name} successfully registered!`);
}

function renderStudentDashboardLogs() {
    const logsContainer = document.getElementById('studentFullLogsList');
    logsContainer.innerHTML = '';

    document.getElementById('studentTotalClassesCount').innerText = studentAttendanceLogs.length + 5;
    const percentage = ((studentAttendanceLogs.length / (studentAttendanceLogs.length + 1)) * 100).toFixed(1) + '%';
    document.getElementById('studentAttendancePercentage').innerText = percentage;

    studentAttendanceLogs.forEach(log => {
        const item = document.createElement('div');
        item.className = "bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center justify-between";
        item.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <i class="fa-solid fa-check text-xs"></i>
                </div>
                <div>
                    <h5 class="text-xs font-bold text-slate-200">${log.subject}</h5>
                    <p class="text-[10px] text-slate-400">${log.date} at ${log.time} • GPS Verified (${log.distance})</p>
                </div>
            </div>
            <span class="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded">${log.status}</span>
        `;
        logsContainer.appendChild(item);
    });
}

function renderTeacherMasterLogs() {
    const masterList = document.getElementById('teacherMasterLogsList');
    masterList.innerHTML = '';
    document.getElementById('teacherTotalArchivedCount').innerText = `${masterClassSessions.length} Sessions`;

    if (masterClassSessions.length === 0) {
        masterList.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">No archived session logs yet.</p>`;
        return;
    }

    masterClassSessions.forEach((session) => {
        const sessionCard = document.createElement('div');
        sessionCard.className = "bg-slate-900/70 border border-slate-700/60 rounded-xl p-3 space-y-2";
        
        let attendeesHtml = session.attendees.map(att => `
            <div class="flex items-center justify-between text-[11px] bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/40">
                <span class="font-medium text-slate-200">${att.name} <span class="text-slate-400">(${att.roll})</span></span>
                <span class="text-emerald-400 text-[10px]">Present @ ${att.time}</span>
            </div>
        `).join('');

        sessionCard.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-700/50 pb-1.5">
                <span class="text-xs font-bold text-indigo-300">${session.subject}</span>
                <span class="text-[10px] text-slate-400">${session.date}</span>
            </div>
            <div class="space-y-1">
                <p class="text-[10px] text-slate-400 font-medium">Attendees (${session.attendees.length} Students):</p>
                ${attendeesHtml}
            </div>
        `;
        masterList.appendChild(sessionCard);
    });
}

// ================= REAL CAMERA SCANNER & GEO-FENCING =================
function openScanner() {
    document.getElementById('scannerModal').classList.remove('hidden');
    
    // Initialize Real Camera QR Scanner using Html5Qrcode
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 220, height: 220 } };

    html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        (decodedText) => {
            // QR successfully scanned from real camera!
            handleScannedQRData(decodedText);
        },
        (errorMessage) => {
            // scanning in progress...
        }
    ).catch(err => {
        console.error("Camera start error: ", err);
        document.getElementById('scannerStatus').innerText = "Camera permission denied or unavailable.";
    });
}

function closeScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
        }).catch(err => console.error("Failed to stop scanner", err));
    }
    document.getElementById('scannerModal').classList.add('hidden');
}

// Haversine Distance Formula in Meters
function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Handle QR Data & Check Real GPS Location (100m Radius)
function handleScannedQRData(qrText) {
    closeScanner();
    document.getElementById('scannerStatus').innerText = "Validating Geo-Location...";

    // Check if real GPS geolocation is supported by browser/device
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser/device.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const studentLat = position.coords.latitude;
            const studentLng = position.coords.longitude;

            // Calculate distance between student and class venue
            const distance = calculateDistanceMeters(studentLat, studentLng, classLocation.lat, classLocation.lng);

            if (distance > classLocation.radiusMeters) {
                alert(`❌ Attendance Rejected!\nYou are approx ${Math.round(distance)} meters away from the classroom. You must be within 100 meters.`);
                return;
            }

            // Success: Within 100m radius and valid QR scan
            recordSuccessfulAttendance(Math.round(distance), qrText);
        },
        (error) => {
            alert("Unable to retrieve your GPS location. Please ensure location services are enabled on your device.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function recordSuccessfulAttendance(distanceMeters, qrText) {
    const now = new Date();
    const dateStr = now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Parse subject from QR text if available, or default
    let activeSub = "Software Engineering (CS-503)";
    if (qrText.includes("ATTENDANCE:")) {
        const parts = qrText.split(":");
        if (parts[1]) activeSub = parts[1];
    }

    studentAttendanceLogs.unshift({
        subject: activeSub,
        date: dateStr,
        time: timeStr,
        distance: distanceMeters + 'm',
        status: 'Present'
    });
    renderStudentDashboardLogs();

    const currentStudentName = document.getElementById('displayStudentName').innerText;
    const currentStudentRoll = document.getElementById('displayStudentRoll').innerText.replace('Roll: ', '');
    
    liveSessionAttendees.push({
        name: currentStudentName,
        roll: currentStudentRoll,
        time: timeStr
    });
    renderTeacherLiveAttendees();

    alert(`✅ Success! QR scanned & GPS verified (${distanceMeters}m away). Attendance recorded.`);
}

// Teacher QR Code Generation
function generateQRCode() {
    const subject = document.getElementById('subjectSelect').value;
    const qrContainer = document.getElementById('qrDisplayContainer');
    const qrImage = document.getElementById('qrCodeImage');
    const subjectTitle = document.getElementById('activeSubjectTitle');

    const qrData = `ATTENDANCE:${subject}:${classLocation.lat}:${classLocation.lng}:${Date.now()}`;
    const encodedData = encodeURIComponent(qrData);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
    
    subjectTitle.innerText = subject;
    qrContainer.classList.remove('hidden');
    liveSessionAttendees = [];
}

function stopQRCode() {
    const subject = document.getElementById('activeSubjectTitle').innerText;
    const now = new Date();
    const timestamp = now.toLocaleString();

    if (liveSessionAttendees.length > 0) {
        masterClassSessions.unshift({
            subject: subject,
            date: timestamp,
            attendees: [...liveSessionAttendees]
        });
        renderTeacherMasterLogs();
    }

    document.getElementById('qrDisplayContainer').classList.add('hidden');
    liveSessionAttendees = [];
    renderTeacherLiveAttendees();
    alert('Active session ended and archived into Master Logs.');
}

function renderTeacherLiveAttendees() {
    const liveList = document.getElementById('teacherLiveList');
    const badge = document.getElementById('liveCountBadge');
    
    badge.innerText = `${liveSessionAttendees.length} Marked`;
    liveList.innerHTML = '';

    if (liveSessionAttendees.length === 0) {
        liveList.innerHTML = `<p class="text-xs text-slate-500 text-center py-4">No attendance recorded in current session.</p>`;
        return;
    }

    liveSessionAttendees.forEach(att => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50";
        item.innerHTML = `
            <div class="flex items-center space-x-2.5">
                <div>
                    <p class="text-xs font-bold text-slate-200">${att.name}</p>
                    <p class="text-[10px] text-slate-400">${att.roll}</p>
                </div>
            </div>
            <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">Scanned @ ${att.time}</span>
        `;
        liveList.prepend(item);
    });
}