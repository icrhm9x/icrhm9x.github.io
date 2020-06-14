document.addEventListener("DOMContentLoaded", function () {
    //Define
    var mainContent = document.getElementById('mainContent');

    initBasicInfo();
    initTimeline();
    initPR();
    initSkill();

    function initBasicInfo() {
        // document.getElementById('userThumbnail').
        document.getElementById('userName').innerHTML = data.name;
        document.getElementById('userJob').innerHTML = data.job;
        document.getElementById('userBirth').innerHTML = data.birth;
        document.getElementById('userGender').innerHTML = data.gender === 0 ? "Nam" : "Nữ";
        document.getElementById('userAddress').innerHTML = data.address;
        document.getElementById('userPhone').innerHTML = data.phone;
        document.getElementById('userEmail').innerHTML = data.email;
    }

    function initTimeline() {
        if (data.timeline === null || data.timeline.length === 0) {
            return;
        }
        var timeline = createElement('div', "Timeline");
        var timelineTitle = createElement('h2', "Content__ttl", "Học vấn");
        var timelineContent = createElement('div', "Timeline-content");
        timelineContent.id = "timelineContent";
        timeline.appendChild(timelineTitle);

        var timelineStart = createElement("div", "Timeline-start");
        var timelineStartIcon = createElement("img", "Timeline-start__ico");
        timelineStartIcon.setAttribute("src", "img/timeline_start.png");
        timelineStart.appendChild(timelineStartIcon);
        timelineStart.appendChild(createElement("p", "Timeline-start__line"));
        timelineContent.appendChild(timelineStart);

        var currentTimelineItem = null;
        var currentTimelineItemContent = null;
        var currentTimelineItemtBody = null;
        var currentYear = 0;
        var timelineBody = createElement("div", "Timeline-body");
        for (let i = 0; i < data.timeline.length; i++) {
            const mData = data.timeline[i];
            if (currentTimelineItem === null || currentYear != mData.year) {
                if (currentTimelineItem !== null) {
                    currentTimelineItemContent.appendChild(currentTimelineItemtBody);
                    currentTimelineItem.appendChild(currentTimelineItemContent);
                    timelineBody.appendChild(currentTimelineItem);
                }
                currentTimelineItem = createElement("div", "Timeline-item");
                currentYear = mData.year;
                currentTimelineItem.appendChild(createElement("p", "Timeline-item__year", currentYear));
                currentTimelineItemContent = createElement("div", "Timeline-item-content");
                var timelineItemIcon = createElement("p", "Timeline-item-content__icon");
                switch (mData.event) {
                    case "start_study":
                        timelineItemIcon.appendChild(createElement("i", "fas fa-school"));
                        break;
                    case "graduation":
                        timelineItemIcon.appendChild(createElement("i", "fas fa-user-graduate"));
                        break;
                    case "start_job":
                        timelineItemIcon.appendChild(createElement("i", "fas fa-user-tie"));
                        break;
                    case "quit_study":
                        timelineItemIcon.appendChild(createElement("i", "fas fa-briefcase"));
                        break;
                    default:
                }
                currentTimelineItemContent.appendChild(timelineItemIcon);
                currentTimelineItemtBody = createElement("div", "Timeline-item-content-body");
            }
            currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__ttl", mData.month + "/" + currentYear));
            switch (mData.event) {
                case "start_study":
                    currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Bắt đầu học " + mData.type + " tại " + mData.at));
                    break;
                case "graduation":
                    currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Hoàn thành khóa học " + mData.type + " tại " + mData.at));
                    break;
                case "start_job":
                    currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Bắt đầu làm " + mData.type + " tại " + mData.at));
                    break;
                case "quit_study":
                    currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", "Thôi học " + mData.type + " tại " + mData.at));
                    break;
                default:
                    currentTimelineItemtBody.appendChild(createElement("p", "Timeline-item-content__txt", mData.event + " at " + mData.at));
            }
        }
        currentTimelineItemContent.appendChild(currentTimelineItemtBody);
        currentTimelineItem.appendChild(currentTimelineItemContent);
        timelineBody.appendChild(currentTimelineItem);
        timelineContent.appendChild(timelineBody);

        var timelineEnd = createElement("div", "Timeline-end");
        var timelineEndIcon = createElement("img", "Timeline-end__ico");
        if (data.gender === 0) {
            timelineEndIcon.setAttribute("src", "img/timeline_end_man.png");
        } else {
            timelineEndIcon.setAttribute("src", "img/timeline_end_women.png");
        }
        timelineEnd.appendChild(timelineEndIcon);
        if (timelineContent.childElementCount % 2 == 1) {
            timelineEnd.appendChild(createElement("p", "Timeline-end__line"));
        } else {
            timelineEnd.appendChild(createElement("p", "Timeline-end__line Timeline-end__line--bottom"));
        }
        timelineContent.appendChild(timelineEnd);

        timeline.appendChild(timelineContent);
        mainContent.appendChild(timeline);

        var timelineTop = 0;
        var timelineBottom = 0;

        var items = document.getElementsByClassName('Timeline-item-content');
        for (let i = 0; i < items.length; i++) {
            if (i % 2 == 0 && items[i].offsetHeight > timelineTop) {
                timelineTop = items[i].offsetHeight;
            } else if (i % 2 == 1 && items[i].offsetHeight > timelineBottom) {
                timelineBottom = items[i].offsetHeight;
            }
        }
        timelineContent.style.paddingTop = (timelineTop + 20) + "px";
        timelineContent.style.paddingBottom = (timelineBottom + 20) + "px";
    }

    function initPR() {
        if (data.pr === null || data.pr.length === 0) {
            return;
        }
        mainContent.appendChild(createElement("h2", "Content__ttl", "Tự giới thiệu"));
        for (let i = 0; i < data.pr.length; i++) {
            mainContent.appendChild(createElement("p", "Content__txt", data.pr[i]));
        }
    }

    function initSkill() {
        if (data.skills === null || data.skills.length === 0) {
            return;
        }
        mainContent.appendChild(createElement("h2", "Content__ttl", "Trình độ - Kỹ năng"));
        for (let i = 0; i < data.skills.length; i++) {
            const skill = data.skills[i];
            if (i === 0) {
                mainContent.appendChild(createElement("h3", "Content__sub Content__sub--first", skill.group_name));
            } else {
                mainContent.appendChild(createElement("h3", "Content__sub", skill.group_name));
            }
            var skillContent = createElement("div", "Content-skill");
            for (let j = 0; j < skill.skill_sheet.length; j++) {
                const element = skill.skill_sheet[j];
                var skillContentItem = createElement("div", "Content-skill-item");
                skillContentItem.appendChild(createElement("p", "Content-skill-item__ttl", element.name));
                var skillContentItemProcess = createElement("p", "Content-skill-item-process");
                var skillContentItemBar = createElement("span", "Content-skill-item-process-bar");
                var skillContentItemValue = createElement("b", "Content-skill-item-process-bar__value");
                skillContentItemValue.setAttribute("data-value", element.point);
                skillContentItemBar.appendChild(skillContentItemValue);
                skillContentItemProcess.appendChild(skillContentItemBar);
                skillContentItem.appendChild(skillContentItemProcess);
                skillContent.appendChild(skillContentItem);
            }
            var skillContentNote = createElement("p", "Content__note");
            for (let m = 0; m < skill.note.length; m++) {
                const note = skill.note[m];
                skillContentNote.appendChild(createElement("span", "", note));
            }
            skillContent.appendChild(skillContentNote);
            mainContent.appendChild(skillContent);
        }
    }

    function createElement(tag, className, content = "") {
        var element = document.createElement(tag);
        if (className !== "") {
            element.className = className;
        }
        if (content !== "") {
            element.innerHTML = content;
        }
        return element;
    }

    setTimeout(function () {
        var elems = document.querySelectorAll('.Content-skill-item-process-bar__value');
        [].forEach.call(elems, function (el) {
            el.style.width = el.getAttribute("data-value") + "%";
        });
    }, 10);
});

data = {
    "name": "Nguyễn Duy Tùng",
    "job": "Back-End",
    "birth": "04/11/1994",
    "gender": 0,
    "address": "Đông Anh - Hà Nội",
    "phone": "034-461-3072",
    "email": "nguyenduytung1104@gmail.com",
    "timeline": [
        {
            "year": 2013,
            "month": 9,
            "event": "start_study",
            "type": "CNTT",
            "at": "ĐH Bách Khoa Hà Nội"
        },
        {
            "year": 2016,
            "month": 3,
            "event": "quit_study",
            "type": "",
            "at": "ĐH Bách Khoa Hà Nội"
        },
        {
            "year": 2016,
            "month": 4,
            "event": "start_job",
            "type": "freelance job",
            "at": "Hà Nội"
        },
        {
            "year": 2019,
            "month": 5,
            "event": "start_study",
            "type": "lập trình",
            "at": "nhà"
        },
        {
            "year": 2019,
            "month": 10,
            "event": "start_study",
            "type": "lập trình web",
            "at": "học viện công nghệ Vietpro"
        },
        {
            "year": 2020,
            "month": 5,
            "event": "graduation",
            "type": "lập trình web",
            "at": "học viện công nghệ Vietpro"
        }
    ],
    "pr": [
        "Tôi là một người có niềm đam mê IT, đặc biệt là ở lĩnh vực Back-End. Tuy kinh nghiệm làm việc của tôi hiện tại chưa nhiều nhưng bản thân tôi tự tin rằng mình có khả năng học hỏi, cũng như tìm tòi những kỹ thuật, ngôn ngữ mới một cách nhanh chóng.",
        "Ngoài ra tôi tự tin rằng mình là người có khả năng giao tiếp cũng như kết nối với những đồng nghiệp khác, vì thế trong công việc tôi luôn có những mối quan hệ tốt cũng như thành tích làm việc nhóm hiệu quả.",
        "Khi có thời gian rảnh tôi thường tìm hiểu về máy tính và chơi game, đây cũng là đam mê lớn thứ 2 của tôi."
    ],
    "skills": [
        {
            "group_name": "Ngôn ngữ lập trình",
            "skill_sheet": [
                {
                    "name": "HTML/CSS",
                    "point": "60"
                },
                {
                    "name": "JavaScript",
                    "point": "40"
                },
                {
                    "name": "PHP/Laravel",
                    "point": "60"
                },
                {
                    "name": "Database",
                    "point": "40"
                }
            ],
            "note": [
                "Chính sự đơn giản, tính hiệu quả và linh động của PHP đã giúp nó trở thành ngôn ngữ phổ biến trong giới lập trình như hiện nay." +
                " PHP là một ngôn ngữ lập trình đem lại cơ hội việc làm rất lớn cho các lập trình viên." +
                " Thêm vào đó, so với các ngôn ngữ lập trình khác PHP cũng dễ học và dễ ứng dụng hơn với các trang web."
            ]
        },
        {
            "group_name": "Kỹ năng khác",
            "skill_sheet": [
                {
                    "name": "Tìm kiếm",
                    "point": "85"
                },
                {
                    "name": "Máy tính",
                    "point": "70"
                },
                {
                    "name": "Giao tiếp",
                    "point": "80"
                },
                {
                    "name": "L.Việc nhóm",
                    "point": "80"
                },
                {
                    "name": "Tiếng Anh",
                    "point": "30"
                }
            ],
            "note": [
                "Tôi tự tin về khả năng tìm kiếm thông tin cũng như tài liệu trên internet. Ngoài ra tôi còn có kinh nghiệm về build PC cũng như cài win, giúp xử lý những lỗi thường gặp của PC một cách nhanh chóng, chính xác."
            ]
        }
    ]
}
