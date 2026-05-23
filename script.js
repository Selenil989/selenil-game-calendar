document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // 저장된 일정 불러오기
  // =========================

  let savedEvents =
    JSON.parse(localStorage.getItem("gameEvents"))
    || [];



  // =========================
  // HTML 요소 가져오기
  // =========================

  const calendarEl =
    document.getElementById("calendar");

  const modal =
    document.getElementById("modal");

  const titleInput =
    document.getElementById("eventTitle");

  const startInput =
    document.getElementById("eventStart");

  const endInput =
    document.getElementById("eventEnd");

  const imageInput =
    document.getElementById("eventImage");

  const previewImage =
    document.getElementById("previewImage");

  const addEventBtn =
    document.getElementById("addEventBtn");

  const saveBtn =
    document.getElementById("saveBtn");

  const deleteBtn =
    document.getElementById("deleteBtn");

  const closeBtn =
    document.getElementById("closeBtn");

  const toast =
    document.getElementById("toast");

  const exportBtn =
    document.getElementById("exportBtn");

  const importInput =
    document.getElementById("importInput");



  // =========================
  // 현재 편집 중인 이벤트
  // =========================

  let currentEvent = null;

  let uploadedImage = "";



  // =========================
  // FullCalendar 생성
  // =========================

  const calendar =
    new FullCalendar.Calendar(calendarEl, {

      // 월간 캘린더 보기
      initialView: "dayGridMonth",

      // 드래그 이동 가능
      editable: true,

      // 캘린더 높이 자동 조절
      height: "auto",

      // 하루에 일정이 너무 많으면 정리해서 보여줌
      dayMaxEvents: true,



      // =========================
      // 빈 날짜 더블클릭 시 일정 생성창 열기
      // =========================

      dateClick: function(info) {

        const now =
          new Date().getTime();

        if (
          window.lastDateClick &&
          now - window.lastDateClick < 300
        ) {

          currentEvent = null;

          titleInput.value = "";

          startInput.value =
            info.dateStr;

          endInput.value = "";

          uploadedImage = "";

          previewImage.style.display =
            "none";

          modal.classList.remove("hidden");
        }

        window.lastDateClick = now;
      },



      // =========================
      // 드래그로 일정 이동 시 자동 저장
      // =========================

      eventDrop: function() {

        saveEvents();

      },



      // =========================
      // 저장된 일정 있으면 불러오고,
      // 없으면 기본 예시 일정 표시
      // =========================

      events:
        savedEvents.length > 0
          ? savedEvents
          : [

            {
              id: "1",

              title: "봄 이벤트",

              start: "2026-05-14",

              end: "2026-05-20",

              extendedProps: {
                image:
                  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
              },
            },

          ],



      // =========================
      // 일정 배너 모양 만들기
      // =========================

      eventContent: function(info) {

        const image =
          info.event.extendedProps.image;

        return {

          html: `
            <div class="game-event">

              <img src="${image}" />

              <div class="overlay">

                <div class="title">
                  ${info.event.title}
                </div>

              </div>

            </div>
          `,
        };
      },



      // =========================
      // 일정 더블클릭 시 편집창 열기
      // =========================

      eventDidMount: function(info) {

        info.el.addEventListener(
          "dblclick",
          () => {

            currentEvent = info.event;

            titleInput.value =
              currentEvent.title;

            startInput.value =
              currentEvent.startStr;

            endInput.value =
              currentEvent.endStr || "";

            uploadedImage =
              currentEvent.extendedProps.image || "";

            if (uploadedImage) {

              previewImage.src =
                uploadedImage;

              previewImage.style.display =
                "block";

            } else {

              previewImage.style.display =
                "none";

            }

            modal.classList.remove(
              "hidden"
            );
          }
        );
      },

    });



  // =========================
  // 캘린더 화면에 표시
  // =========================

  calendar.render();




  // =========================
  // 일정 저장 함수
  // =========================

  function saveEvents() {

    const events =
      calendar.getEvents();

    const data =
      events.map(event => ({

        id: event.id,

        title: event.title,

        start: event.startStr,

        end: event.endStr,

        extendedProps: {
          image:
            event.extendedProps.image,
        },

      }));

    localStorage.setItem(
      "gameEvents",
      JSON.stringify(data)
    );

    showToast();

  }




  // =========================
  // 저장 완료 토스트 표시
  // =========================

  function showToast() {

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 2000);

  }




  // =========================
  // 일정 추가 버튼
  // =========================

  addEventBtn.addEventListener(
    "click",
    () => {

      currentEvent = null;

      titleInput.value = "";

      startInput.value = "";

      endInput.value = "";

      uploadedImage = "";

      previewImage.style.display =
        "none";

      modal.classList.remove("hidden");

    }
  );




  // =========================
  // 이미지 업로드
  // =========================

  imageInput.addEventListener(
    "change",
    function () {

      const file = this.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload = function (e) {

        uploadedImage =
          e.target.result;

        previewImage.src =
          uploadedImage;

        previewImage.style.display =
          "block";

      };

      reader.readAsDataURL(file);

    }
  );




  // =========================
  // 저장 버튼
  // =========================

  saveBtn.addEventListener(
    "click",
    () => {

      const title =
        titleInput.value;

      const start =
        startInput.value;

      const end =
        endInput.value;

      if (!title || !start) {

        alert("제목과 시작일 입력");

        return;

      }

      // 기존 일정 수정
      if (currentEvent) {

        currentEvent.setProp(
          "title",
          title
        );

        currentEvent.setStart(start);

        currentEvent.setEnd(end);

        currentEvent.setExtendedProp(
          "image",
          uploadedImage
        );

      }

      // 새 일정 추가
      else {

        calendar.addEvent({

          id: Date.now().toString(),

          title,

          start,

          end,

          extendedProps: {
            image: uploadedImage,
          },

        });

      }

      saveEvents();

      modal.classList.add("hidden");

    }
  );




  // =========================
  // 닫기 버튼
  // =========================

  closeBtn.addEventListener(
    "click",
    () => {

      modal.classList.add("hidden");

    }
  );




  // =========================
  // 삭제 버튼
  // =========================

  deleteBtn.addEventListener(
    "click",
    () => {

      if (!currentEvent) return;

      const ok =
        confirm("정말 삭제할까요?");

      if (!ok) return;

      currentEvent.remove();

      saveEvents();

      modal.classList.add("hidden");

    }
  );




  // =========================
  // 편집창 바깥 클릭 시 닫기
  // =========================

  modal.addEventListener(
    "click",
    (e) => {

      if (e.target === modal) {

        modal.classList.add("hidden");

      }

    }
  );




  // =========================
  // ESC 키로 편집창 닫기
  // =========================

  document.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Escape") {

        modal.classList.add("hidden");

      }

    }
  );




  // =========================
  // JSON 내보내기
  // =========================

  exportBtn.addEventListener(
    "click",
    () => {

      const data =
        localStorage.getItem("gameEvents")
        || "[]";

      const blob =
        new Blob(
          [data],
          { type: "application/json" }
        );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "game-events.json";

      a.click();

      URL.revokeObjectURL(url);

    }
  );




  // =========================
  // JSON 불러오기
  // =========================

  importInput.addEventListener(
    "change",
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        function(event) {

          try {

            const data =
              JSON.parse(
                event.target.result
              );

            localStorage.setItem(
              "gameEvents",
              JSON.stringify(data)
            );

            location.reload();

          } catch {

            alert("JSON 파일 형식이 잘못됐습니다.");

          }

        };

      reader.readAsText(file);

    }
  );

});