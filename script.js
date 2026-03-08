
  let currentFacultyRole = 'subject';

        // Switch between Student and Faculty tabs
        function switchTab(tab) {
            // Hide all forms
            document.querySelectorAll('.login-form-container').forEach(form => {
                form.classList.remove('active');
            });

            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected form
            if (tab === 'student') {
                document.getElementById('studentForm').classList.add('active');
                document.querySelector('.student-tab').classList.add('active');
            } else {
                document.getElementById('facultyForm').classList.add('active');
                document.querySelector('.faculty-tab').classList.add('active');
            }

            // Hide all messages
            hideAllMessages();
        }

        // Select faculty role
        function selectFacultyRole(role) {
            currentFacultyRole = role;
            
            document.querySelectorAll('.faculty-role-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.role === role) {
                    option.classList.add('active');
                }
            });

            hideAllMessages();
        }

        // Toggle password visibility
        function togglePassword(formType) {
            const passwordInput = document.getElementById(formType + 'Password');
            const toggleIcon = passwordInput.parentElement.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('ri-eye-off-line');
                toggleIcon.classList.add('ri-eye-line');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('ri-eye-line');
                toggleIcon.classList.add('ri-eye-off-line');
            }
        }

        // Hide all messages
        function hideAllMessages() {
            document.querySelectorAll('.error-message, .success-message, .warning-message').forEach(msg => {
                msg.classList.remove('show');
            });
        }

        // Show error message
        function showError(formType, message) {
            const errorDiv = document.getElementById(formType + 'Error');
            document.getElementById(formType + 'ErrorText').textContent = message;
            errorDiv.classList.add('show');
            
            // Add shake animation
            const container = document.querySelector('.main-container');
            container.classList.add('shake');
            setTimeout(() => {
                container.classList.remove('shake');
            }, 300);
        }

        // Show success message
        function showSuccess(formType, message) {
            const successDiv = document.getElementById(formType + 'Success');
            document.getElementById(formType + 'SuccessText').textContent = message;
            successDiv.classList.add('show');
        }

        // Show warning message
        function showWarning(formType, message) {
            const warningDiv = document.getElementById(formType + 'Warning');
            document.getElementById(formType + 'WarningText').textContent = message;
            warningDiv.classList.add('show');
        }

        // Validate student input
        function validateStudentInput() {
            const rollNo = document.getElementById('studentRollNo').value.trim();
            const password = document.getElementById('studentPassword').value;
            const semester = document.getElementById('studentSemester').value;

            if (!rollNo) {
                showError('student', 'Please enter your Roll Number');
                return false;
            }

            // Validate Roll Number format (Requirement #3)
            const rollPattern = /^\d{2}[A-Z]\d{2}[A-Z]\d{4}$/i;
            if (!rollPattern.test(rollNo)) {
                showError('student', 'Invalid Roll Number format. Example: 23A51A0501');
                return false;
            }

            if (!password) {
                showError('student', 'Please enter your password');
                return false;
            }

            if (password.length < 6) {
                showError('student', 'Password must be at least 6 characters');
                return false;
            }

            if (!semester) {
                showError('student', 'Please select your semester');
                return false;
            }

            return true;
        }

        // Validate faculty input
        function validateFacultyInput() {
            const facultyId = document.getElementById('facultyId').value.trim();
            const password = document.getElementById('facultyPassword').value;
            const department = document.getElementById('facultyDepartment').value;
            const semester = document.getElementById('facultySemester').value;

            if (!facultyId) {
                showError('faculty', 'Please enter your Employee ID');
                return false;
            }

            if (!password) {
                showError('faculty', 'Please enter your password');
                return false;
            }

            if (password.length < 8) {
                showError('faculty', 'Password must be at least 8 characters (Faculty requirement)');
                return false;
            }

            if (!department) {
                showError('faculty', 'Please select your department');
                return false;
            }

            if (!semester) {
                showError('faculty', 'Please select semester');
                return false;
            }

            return true;
        }

        // Handle student login
        function handleStudentLogin(event) {
            event.preventDefault();
            hideAllMessages();

            if (!validateStudentInput()) {
                return;
            }

            const loginBtn = document.getElementById('studentLoginBtn');
            const originalContent = loginBtn.innerHTML;
            
            // Show loading state
            loginBtn.innerHTML = '<span class="loading"></span> Authenticating...';
            loginBtn.disabled = true;

            const rollNo = document.getElementById('studentRollNo').value.trim();
            const password = document.getElementById('studentPassword').value;
            const semester = document.getElementById('studentSemester').value;
            const rememberMe = document.getElementById('studentRemember').checked;

            // Simulate API call (replace with actual backend integration)
            setTimeout(() => {
                // Demo credentials for testing
                const validCredentials = {
                    rollNo: '23A51A0501',
                    password: 'student123'
                };

                if (rollNo === validCredentials.rollNo && password === validCredentials.password) {
                    showSuccess('student', 'Login successful! Redirecting to student dashboard...');
                    
                    // Store session data
                    const sessionData = {
                        userId: rollNo,
                        role: 'student',
                        semester: semester,
                        rememberMe: rememberMe,
                        loginTime: new Date().toISOString(),
                        accessLevel: 'read-only' // Requirement #1
                    };

                    if (rememberMe) {
                        localStorage.setItem('vemuStudentSession', JSON.stringify(sessionData));
                    } else {
                        sessionStorage.setItem('vemuStudentSession', JSON.stringify(sessionData));
                    }

                    // Redirect to student dashboard
                    setTimeout(() => {
                        alert('Redirecting to Student Dashboard...\n\nAccess Level: Read-Only (Requirement #1)\nYou can view your mid marks and assignments.');
                        // window.location.href = 'student-dashboard.html';
                    }, 1500);
                } else {
                    showError('student', 'Invalid Roll Number or password. Please try again.');
                    loginBtn.innerHTML = originalContent;
                    loginBtn.disabled = false;
                }
            }, 1500);
        }

        // Handle faculty login
        function handleFacultyLogin(event) {
            event.preventDefault();
            hideAllMessages();

            if (!validateFacultyInput()) {
                return;
            }

            const loginBtn = document.getElementById('facultyLoginBtn');
            const originalContent = loginBtn.innerHTML;
            
            // Show loading state
            loginBtn.innerHTML = '<span class="loading"></span> Authenticating...';
            loginBtn.disabled = true;

            const facultyId = document.getElementById('facultyId').value.trim();
            const password = document.getElementById('facultyPassword').value;
            const department = document.getElementById('facultyDepartment').value;
            const semester = document.getElementById('facultySemester').value;
            const rememberMe = document.getElementById('facultyRemember').checked;

            // Simulate API call (replace with actual backend integration)
            setTimeout(() => {
                // Demo credentials for testing
                const validCredentials = {
                    facultyId: 'FAC001',
                    password: 'faculty123'
                };

                if (facultyId === validCredentials.facultyId && password === validCredentials.password) {
                    showSuccess('faculty', 'Login successful! Redirecting to faculty dashboard...');
                    
                    // Store session data
                    const sessionData = {
                        userId: facultyId,
                        role: 'faculty',
                        facultyRole: currentFacultyRole,
                        department: department,
                        semester: semester,
                        rememberMe: rememberMe,
                        loginTime: new Date().toISOString(),
                        accessLevel: 'write-read' // Requirement #1
                    };

                    if (rememberMe) {
                        localStorage.setItem('vemuFacultySession', JSON.stringify(sessionData));
                    } else {
                        sessionStorage.setItem('vemuFacultySession', JSON.stringify(sessionData));
                    }

                    // Redirect to faculty dashboard
                    setTimeout(() => {
                        let roleText = '';
                        if (currentFacultyRole === 'subject') {
                            roleText = 'Subject Faculty';
                        } else if (currentFacultyRole === 'class') {
                            roleText = 'Class Teacher';
                        } else {
                            roleText = 'HOD';
                        }

                        alert('Redirecting to Faculty Dashboard...\n\nRole: ' + roleText + '\nAccess Level: Write & Read (Requirement #1)\nDepartment: ' + department);
                        // window.location.href = 'faculty-dashboard.html';
                    }, 1500);
                } else {
                    showError('faculty', 'Invalid Employee ID or password. Please try again.');
                    loginBtn.innerHTML = originalContent;
                    loginBtn.disabled = false;
                }
            }, 1500);
        }

        // Check for remembered session on page load
        window.addEventListener('DOMContentLoaded', () => {
            // Check student session
            const savedStudentSession = localStorage.getItem('vemuStudentSession');
            if (savedStudentSession) {
                try {
                    const session = JSON.parse(savedStudentSession);
                    document.getElementById('studentRollNo').value = session.userId || '';
                    document.getElementById('studentSemester').value = session.semester || '';
                    document.getElementById('studentRemember').checked = true;
                } catch (e) {
                    console.error('Error loading student session:', e);
                }
            }

            // Check faculty session
            const savedFacultySession = localStorage.getItem('vemuFacultySession');
            if (savedFacultySession) {
                try {
                    const session = JSON.parse(savedFacultySession);
                    document.getElementById('facultyId').value = session.userId || '';
                    document.getElementById('facultyDepartment').value = session.department || '';
                    document.getElementById('facultySemester').value = session.semester || '';
                    document.getElementById('facultyRemember').checked = true;
                    
                    if (session.facultyRole) {
                        selectFacultyRole(session.facultyRole);
                    }
                } catch (e) {
                    console.error('Error loading faculty session:', e);
                }
            }

            // Add input validation on focus
            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    hideAllMessages();
                });
            });
        });

        // Auto-show faculty role selection when faculty tab is clicked
        document.querySelector('.faculty-tab').addEventListener('click', () => {
            document.getElementById('facultyRoleSelect').classList.add('show');
        });


