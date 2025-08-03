// קובץ JavaScript כללי לאפליקציה

// פונקציה להצגת הודעות
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(messageDiv);
    
    // הסרת ההודעה אחרי 3 שניות
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// פונקציה לאישור פעולות
function confirmAction(message) {
    return confirm(message);
}

// פונקציה לטעינת נתונים
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// הוספת CSS לאנימציות
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// הוספת event listeners כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    // הוספת loading state לכפתורים
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.disabled = true;
                this.textContent = 'טוען...';
                
                // החזרת המצב המקורי אחרי 2 שניות
                setTimeout(() => {
                    this.disabled = false;
                    this.textContent = this.getAttribute('data-original-text') || this.textContent;
                }, 2000);
            }
        });
    });
    
    // שמירת הטקסט המקורי של הכפתורים
    buttons.forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
    });
}); 