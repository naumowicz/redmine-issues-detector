// ==UserScript==
// @name         Issues Detector
// @namespace    ___add namespace here
// @version      1.0
// @description  Detecting new issues from redmine
// @author       Mateusz Naumowicz
// @match        url to query
// @grant        none
// ==/UserScript==

class IssuesDetector {
	constructor() {
		this.subjectSelector = 'td.subject';
		this.listOfSubjects = [];
		this.interval = 60000;
		this.urlToSound = '';
		this.isOk = true;
	}

	checkListOfSubjects() {
		document.querySelectorAll(this.subjectSelector).forEach(subject => {
			if (subject === null) {
				console.log(subject);
			} else if ((this.listOfSubjects.find(elementOfListOfSubjects => {
				return subject.innerText === elementOfListOfSubjects
			})) === undefined) {
				this.isOk = false;
				this.listOfSubjects.push(subject.innerText);
			}
		})
		if (this.isOk === false) {
			this.playSound();
		}
	}

	saveListOfSubjectsToSession() {
		sessionStorage.setItem('listOfSubjects', JSON.stringify(this.listOfSubjects));
	}

	loadListOfSubjectsFromSession() {
		const loadedList = JSON.parse(sessionStorage.getItem('listOfSubjects'));
		if (loadedList === null) {
			this.listOfSubjects = [];
		} else {
			this.listOfSubjects = loadedList;
		}
	}

	playSound() {
		var a = new Audio(this.url);
		a.play();
	}
}

window.onload = () => {
	const issuesDetector = new IssuesDetector();

	issuesDetector.loadListOfSubjectsFromSession();

	issuesDetector.checkListOfSubjects();

	issuesDetector.saveListOfSubjectsToSession();

	setTimeout(function () { location.reload(); }, issuesDetector.interval);
}
