let currentLoginRole = 'student';
let currentUserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";

// Active Class Geo-Coordinates (Configured strictly by Teacher)
let classLocation = {
    lat: 26.3251,
    lng: 89.4582,
    radiusMeters: 100
};

// Simulated Student Roster Database
let studentRoster = [
    { name: "Satyajit Roy", roll: "CSE/2024/042", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { name: "Debojit Sarkar", roll: "CSE/2024/045", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { name: "Rishav Prasad", roll: "CSE/2024/050", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" }
];

// Handle Login Screen Role Switching
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

// Process Login and Render Corresponding Dashboard
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

        studentDash.classList.remove('hidden');
        teacherDash.classList.add('hidden');
        headerRoleBadge.innerText = "Student Portal";
    } else {
        const teacherName = document.getElementById('inputTeacherName').value || "Faculty Member";
        document.getElementById('displayTeacherName').innerText = teacherName;

        teacherDash.classList.remove('hidden');
        studentDash.classList.add('hidden');
        headerRoleBadge.innerText = "Faculty Portal";

        renderTeacherStudentList();
    }
}

// Logout to return to Login Screen
function logout() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('teacherDashboard').classList.add('hidden');
}

// Profile Modal Controls
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
    if (currentLoginRole === 'student') {
        alert(`Geo-Fence Notice:\nYou must be within 100 meters of Lat: ${classLocation.lat}, Lng: ${classLocation.lng} to record attendance.`);
    } else {
        alert(`Faculty Geo-Fence:\nCurrent active venue is set to Lat: ${classLocation.lat}, Lng: ${classLocation.lng} (${classLocation.radiusMeters}m radius).`);
    }
}

// Save Profile Changes
function saveProfileChanges() {
    const newMobile = document.getElementById('profileMobile').value;
    const newEmail = document.getElementById('profileEmail').value;
    const newAvatarUrl = document.getElementById('profileAvatarInput').value;

    if (newAvatarUrl) {
        currentUserAvatar = newAvatarUrl;
        document.getElementById('displayStudentAvatar').src = currentUserAvatar;
        document.getElementById('profileModalAvatar').src = currentUserAvatar;
    }

    alert(`Profile updated successfully!\nNew Mobile: ${newMobile}\nNew Email: ${newEmail}`);
    closeProfileModal();
}

// Teacher Location Update Function
function updateClassLocation() {
    const lat = parseFloat(document.getElementById('teacherLatInput').value);
    const lng = parseFloat(document.getElementById('teacherLngInput').value);

    if (isNaN(lat) || isNaN(lng)) {
        alert('Please enter valid latitude and longitude numbers.');
        return;
    }

    classLocation.lat = lat;
    classLocation.lng = lng;
    document.getElementById('studentViewLocationInfo').innerText = `Lat: ${lat}, Lng: ${lng} (100m Limit)`;
    alert('Class venue geo-coordinates updated successfully! New QR codes will enforce this 100m radius.');
}

// Teacher Student Management
function renderTeacherStudentList() {
    const listContainer = document.getElementById('teacherStudentList');
    listContainer.innerHTML = '';

    if (studentRoster.length === 0) {
        listContainer.innerHTML = `<p class="text-[10px] text-slate-500 text-center py-2">No students registered in roster.</p>`;
        return;
    }

    studentRoster.forEach((student, index) => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between bg-slate-900/60 p-2 rounded-xl border border-slate-700/50";
        item.innerHTML = `
            <div class="flex items-center space-x-2.5">
                <img src="${student.avatar}" class="w-7 h-7 rounded-full object-cover border border-slate-600">
                <div>
                    <span class="text-xs font-bold text-slate-200">${student.name}</span>
                    <span class="text-[10px] text-slate-400 block">(${student.roll})</span>
                </div>
            </div>
            <button onclick="deleteStudentByTeacher(${index})" class="text-rose-400 hover:text-rose-300 text-xs px-2 py-1 rounded bg-rose-500/10 transition-all">
                <i class="fa-solid fa-trash-can"></i> Delete
            </button>
        `;
        listContainer.appendChild(item);
    });
}

function addStudentByTeacher() {
    const nameInput = document.getElementById('newStudentNameInput');
    const rollInput = document.getElementById('newStudentRollInput');

    if (!nameInput.value || !rollInput.value) {
        alert('Please enter both student name and roll number.');
        return;
    }

    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
    studentRoster.push({ name: nameInput.value, roll: rollInput.value, avatar: defaultAvatar });
    nameInput.value = '';
    rollInput.value = '';
    renderTeacherStudentList();
    alert('Student successfully added to the roster!');
}

function deleteStudentByTeacher(index) {
    if (confirm('Are you sure you want to remove this student from the system?')) {
        studentRoster.splice(index, 1);
        renderTeacherStudentList();
        alert('Student removed successfully.');
    }
}

// Scanner Modal Controls
function openScanner() {
    document.getElementById('scannerModal').classList.remove('hidden');
}

function closeScanner() {
    document.getElementById('scannerModal').classList.add('hidden');
}

// Haversine Formula to Calculate Distance between two GPS points in Meters
function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
}

// Verify Geo-Location (100 Meter Radius Check) and Mark Attendance
function verifyAndMarkAttendance() {
    // Simulate student GPS location. For testing within range, use classLocation coords + tiny offset.
    // To simulate being too far, you can change simulated coords.
    const studentSimulatedLat = classLocation.lat + 0.0004; // ~40-45 meters away (Inside 100m)
    // const studentSimulatedLat = classLocation.lat + 0.002; // Uncomment to test >100m rejection

    const distance = calculateDistanceMeters(
        studentSimulatedLat, classLocation.lng,
        classLocation.lat, classLocation.lng
    );

    if (distance > classLocation.radiusMeters) {
        closeScanner();
        alert(`❌ Attendance Rejected!\nYou are approx ${Math.round(distance)} meters away from the classroom. You must be within 100 meters to scan this QR code.`);
        return;
    }

    closeScanner();
    const logsList = document.getElementById('studentLogsList');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newLogItem = document.createElement('div');
    newLogItem.className = "bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center justify-between";
    newLogItem.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <i class="fa-solid fa-check text-xs"></i>
            </div>
            <div>
                <h5 class="text-xs font-bold text-slate-200">Software Engineering (CS-503)</h5>
                <p class="text-[10px] text-slate-400">Today, ${timeString} • Verified (${Math.round(distance)}m away)</p>
            </div>
        </div>
        <span class="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Present</span>
    `;
    logsList.prepend(newLogItem);
    alert(`✅ Success! Location verified (${Math.round(distance)}m from class). Attendance recorded.`);
}

// Teacher QR Code Generation
function generateQRCode() {
    const subject = document.getElementById('subjectSelect').value;
    const qrContainer = document.getElementById('qrDisplayContainer');
    const qrImage = document.getElementById('qrCodeImage');
    const subjectTitle = document.getElementById('activeSubjectTitle');

    const qrData = encodeURIComponent(`ATTENDANCE:${subject}:${classLocation.lat}:${classLocation.lng}:${Date.now()}`);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
    
    subjectTitle.innerText = subject;
    qrContainer.classList.remove('hidden');

    setTimeout(() => {
        const studentName = document.getElementById('displayStudentName').innerText;
        const studentRoll = document.getElementById('displayStudentRoll').innerText.replace('Roll: ', '');
        addLiveStudent(studentName, studentRoll, currentUserAvatar);
    }, 2000);
}

function stopQRCode() {
    document.getElementById('qrDisplayContainer').classList.add('hidden');
    alert('Active attendance session terminated.');
}

function addLiveStudent(name, roll, avatar) {
    const liveList = document.getElementById('teacherLiveList');
    if (liveList.querySelector('p')) {
        liveList.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = "flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50";
    item.innerHTML = `
        <div class="flex items-center space-x-2.5">
            <img src="${avatar}" class="w-7 h-7 rounded-full object-cover border border-slate-600">
            <div>
                <p class="text-xs font-bold text-slate-200">${name}</p>
                <p class="text-[10px] text-slate-400">${roll}</p>
            </div>
        </div>
        <span class="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">Verified 100m</span>
    `;
    liveList.prepend(item);
    document.getElementById('liveCountBadge').innerText = "1 Marked";
}