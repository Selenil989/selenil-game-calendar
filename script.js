document.addEventListener("DOMContentLoaded", async function () {

  // =========================
  // Supabase 연결 정보
  // =========================

  const SUPABASE_URL =
    "https://fqbpjvycdbicbbshxkyb.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_bXR-gFa8AVTBWAn3nOT4HQ_N_bq7kSI";

  const ADMIN_EMAIL =
    "dbdjvmfos@gmail.com";

  const supabaseClient =
    supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );



  // =========================
  // HTML 요소 가져오기
  // =========================

  const calendarEl =
    document.getElementById("calendar");

  const loginBtn =
    document.getElementById("loginBtn");

  const logoutBtn =
    document.getElementById("logoutBtn");

  const addEventBtn =
    document.getElementById("addEventBtn");

  const loginStatus =
    document.getElementById("loginStatus");

  const loginModal =
    document.getElementById("loginModal");

  const eventModal =
    document.getElementById("eventModal");

  const loginEmail =
    document.getElementById("loginEmail");

  const loginPassword =
    document.getElementById("loginPassword");

  const submitLoginBtn =
    document.getElementById("submitLoginBtn");

  const closeLoginBtn =
    document.getElementById("closeLoginBtn");

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

  const saveBtn =
    document.getElementById("saveBtn");

  const deleteBtn =
    document.getElementById("deleteBtn");

  const closeEventBtn =
    document.getElementById("closeEventBtn");

  const toast =
    document.getElementById("toast");

  const searchInput =
    document.getElementById("searchInput");

  const clearSearchBtn =
    document.getElementById("clearSearchBtn");



  // =========================
  // 현재 상태
  // =========================

  let currentUser = null;

  let isAdmin = false;

  let currentEvent = null;

  let uploadedImage = "";

  let uploadedColor = "#1f2937";

  let calendar = null;

  let allEvents = [];



  // =========================
  // 토스트 알림
  // =========================

  function showToast(message) {

    toast.textContent =
      message || "저장 완료";

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 2000);

  }



  // =========================
  // 관리자 UI 적용
  // =========================

  function applyAuthUI() {

    isAdmin =
      currentUser?.email === ADMIN_EMAIL;

    if (isAdmin) {

      loginBtn.classList.add("hidden");

      logoutBtn.classList.remove("hidden");

      addEventBtn.classList.remove("hidden");

      loginStatus.textContent =
        "관리자 모드";

    } else {

      loginBtn.classList.remove("hidden");

      logoutBtn.classList.add("hidden");

      addEventBtn.classList.add("hidden");

      loginStatus.textContent =
        "방문자 모드";

      eventModal.classList.add("hidden");

    }

    if (calendar) {

      calendar.setOption(
        "editable",
        isAdmin
      );

    }

  }



  // =========================
  // 로그인 상태 확인
  // =========================

  async function checkLoginStatus() {

    const { data } =
      await supabaseClient.auth.getSession();

    currentUser =
      data.session?.user || null;

    applyAuthUI();

  }



  // =========================
  // 일정 불러오기
  // =========================

  async function loadEventsFromSupabase() {

    const { data, error } =
      await supabaseClient
        .from("events")
        .select("*")
        .order("start_date", {
          ascending: true
        });

    if (error) {

      console.error(error);

      alert("일정을 불러오지 못했습니다.");

      return [];

    }

    return data.map(item => ({

      id: item.id,

      title: item.title,

      start: item.start_date,

      end: item.end_date,

      extendedProps: {
        image: item.image_url || "",
        color: item.color || "#1f2937",
      },

    }));

  }



  // =========================
  // 일정 추가
  // =========================

  async function insertEventToSupabase(eventData) {

    const { error } =
      await supabaseClient
        .from("events")
        .insert({

          id: eventData.id,

          title: eventData.title,

          start_date: eventData.start,

          end_date:
            eventData.end || null,

          image_url:
            eventData.extendedProps.image || "",

          color:
            eventData.extendedProps.color || "#1f2937",

        });

    if (error) {

      console.error(error);

      alert("일정 추가 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 일정 수정
  // =========================

  async function updateEventInSupabase(eventData) {

    const { error } =
      await supabaseClient
        .from("events")
        .update({

          title: eventData.title,

          start_date: eventData.start,

          end_date:
            eventData.end || null,

          image_url:
            eventData.extendedProps.image || "",

          color:
            eventData.extendedProps.color || "#1f2937",

        })
        .eq("id", eventData.id);

    if (error) {

      console.error(error);

      alert("일정 수정 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 일정 삭제
  // =========================

  async function deleteEventFromSupabase(eventId) {

    const { error } =
      await supabaseClient
        .from("events")
        .delete()
        .eq("id", eventId);

    if (error) {

      console.error(error);

      alert("일정 삭제 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 이미지 업로드
  // =========================

  async function uploadImageToSupabase(file) {

    if (!file) {

      return uploadedImage;

    }

    const fileExt =
      file.name.split(".").pop();

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;

    const filePath =
      `banners/${fileName}`;

    const { error } =
      await supabaseClient
        .storage
        .from("event-images")
        .upload(filePath, file);

    if (error) {

      console.error(error);

      alert("이미지 업로드 실패");

      return "";

    }

    const { data } =
      supabaseClient
        .storage
        .from("event-images")
        .getPublicUrl(filePath);

    return data.publicUrl;

  }



  // =========================
  // 이미지 대표색 추출
  // =========================

  function extractAverageColor(file) {

    return new Promise((resolve) => {

      if (!file) {

        resolve("#1f2937");

        return;

      }

      const reader =
        new FileReader();

      reader.onload = function(e) {

        const img =
          new Image();

        img.onload = function() {

          const canvas =
            document.createElement("canvas");

          const ctx =
            canvas.getContext("2d");

          canvas.width = 40;
          canvas.height = 40;

          ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const data =
            ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            ).data;

          let r = 0;
          let g = 0;
          let b = 0;
          let count = 0;

          for (let i = 0; i < data.length; i += 16) {

            r += data[i];
            g += data[i + 1];
            b += data[i + 2];

            count++;

          }

          r =
            Math.floor(r / count);

          g =
            Math.floor(g / count);

          b =
            Math.floor(b / count);

          resolve(
            `rgb(${r}, ${g}, ${b})`
          );

        };

        img.src =
          e.target.result;

      };

      reader.readAsDataURL(file);

    });

  }



  // =========================
  // 기존 일정 편집창 열기
  // =========================

  function openModalForEvent(event) {

    currentEvent =
      event;

    titleInput.value =
      event.title;

    startInput.value =
      event.startStr;

    endInput.value =
      event.endStr || "";

    uploadedImage =
      event.extendedProps.image || "";

    uploadedColor =
      event.extendedProps.color || "#1f2937";

    imageInput.value =
      "";

    if (uploadedImage) {

      previewImage.src =
        uploadedImage;

      previewImage.style.display =
        "block";

    } else {

      previewImage.style.display =
        "none";

    }

    eventModal.classList.remove("hidden");

  }



  // =========================
  // 새 일정 편집창 열기
  // =========================

  function openModalForNewEvent(startDate = "") {

    currentEvent =
      null;

    titleInput.value =
      "";

    startInput.value =
      startDate;

    endInput.value =
      "";

    uploadedImage =
      "";

    uploadedColor =
      "#1f2937";

    imageInput.value =
      "";

    previewImage.style.display =
      "none";

    eventModal.classList.remove("hidden");

  }



  // =========================
  // 로그인 실행 함수
  // =========================

  async function handleLogin() {

    const email =
      loginEmail.value.trim();

    const password =
      loginPassword.value;

    const { data, error } =
      await supabaseClient.auth
        .signInWithPassword({

          email,
          password,

        });

    if (error) {

      console.error(error);

      alert("로그인 실패");

      return;

    }

    currentUser =
      data.user;

    applyAuthUI();

    loginPassword.value =
      "";

    loginModal.classList.add(
      "hidden"
    );

    showToast("로그인 완료");

  }



  // =========================
  // 검색 적용 함수
  // =========================

  function applySearchFilter() {

    if (!calendar) return;

    const keyword =
      searchInput.value.trim().toLowerCase();

    const filteredEvents =
      allEvents.filter(event => {

        return event.title
          .toLowerCase()
          .includes(keyword);

      });

    calendar.removeAllEvents();

    filteredEvents.forEach(event => {

      calendar.addEvent(event);

    });

  }



  // =========================
  // 일정 먼저 불러오기
  // =========================

  const loadedEvents =
    await loadEventsFromSupabase();

  allEvents =
    [...loadedEvents];



  // =========================
  // FullCalendar 생성
  // =========================

  calendar =
    new FullCalendar.Calendar(calendarEl, {

      initialView:
        "dayGridMonth",

      locale:
        "ko",

      titleFormat: {
        year: "numeric",
        month: "long"
      },

      editable:
        false,

      height:
        "auto",

      dayMaxEvents:
        true,



      // =========================
      // 빈 날짜 더블클릭 시 일정 생성
      // =========================

      dateClick: function(info) {

        if (!isAdmin) return;

        const now =
          new Date().getTime();

        if (
          window.lastDateClick &&
          now - window.lastDateClick < 300
        ) {

          openModalForNewEvent(
            info.dateStr
          );

        }

        window.lastDateClick =
          now;

      },



      // =========================
      // 일정 드래그 이동 후 저장
      // =========================

      eventDrop: async function(info) {

        if (!isAdmin) {

          info.revert();

          return;

        }

        const eventData = {

          id:
            info.event.id,

          title:
            info.event.title,

          start:
            info.event.startStr,

          end:
            info.event.endStr,

          extendedProps: {
            image:
              info.event.extendedProps.image || "",

            color:
              info.event.extendedProps.color || "#1f2937",
          },

        };

        const ok =
          await updateEventInSupabase(
            eventData
          );

        if (!ok) {

          info.revert();

          return;

        }

        allEvents =
          allEvents.map(event => {

            if (event.id === eventData.id) {

              return eventData;

            }

            return event;

          });

        applySearchFilter();

        showToast("이동 저장 완료");

      },



      // =========================
      // Supabase에서 불러온 일정 표시
      // =========================

      events:
        loadedEvents,



      // =========================
      // 이벤트 배너 UI
      // 앞쪽 2일 이미지 + 나머지 대표색 그라데이션
      // =========================

      eventContent: function(info) {

        const image =
          info.event.extendedProps.image;

        const color =
          info.event.extendedProps.color || "#1f2937";

        const imageHtml =
          image
            ? `
              <div class="event-image-zone">
                <img src="${image}" />
              </div>
            `
            : `<div class="no-image-fill"></div>`;

        const today =
          new Date();

        today.setHours(0, 0, 0, 0);

        const compareDate =
          info.event.end
            ? new Date(info.event.end)
            : new Date(info.event.start);

        compareDate.setHours(0, 0, 0, 0);

        const isExpired =
          compareDate < today;

        return {

          html: `
            <div
              class="game-event ${isExpired ? "expired" : ""}"
              style="--event-color: ${color};"
            >

              ${imageHtml}

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
      // 이벤트 표시 후 처리
      // =========================

      eventDidMount: function(info) {

        // =========================
        // 배너 조각 길이 계산
        // 앞쪽 최대 2일만 이미지 표시
        // =========================

        const dayCell =
          document.querySelector(
            ".fc-daygrid-day"
          );

        if (dayCell) {

          const dayWidth =
            dayCell.getBoundingClientRect().width;

          const eventWidth =
            info.el.getBoundingClientRect().width;

          const segmentDays =
            Math.max(
              1,
              Math.round(eventWidth / dayWidth)
            );

          const imageDays =
            Math.min(2, segmentDays);

          const imagePercent =
            (imageDays / segmentDays) * 100;

          info.el.style.setProperty(
            "--event-image-width",
            `${imagePercent}%`
          );

        }

        // =========================
        // 이벤트 더블클릭 편집
        // =========================

        info.el.addEventListener(
          "dblclick",
          () => {

            if (!isAdmin) return;

            openModalForEvent(
              info.event
            );

          }
        );

      },

    });



  // =========================
  // 캘린더 표시
  // =========================

  calendar.render();



  // =========================
  // 최초 로그인 상태 확인
  // =========================

  await checkLoginStatus();



  // =========================
  // 검색 입력 시 즉시 필터링
  // =========================

  searchInput.addEventListener(
    "input",
    applySearchFilter
  );



  // =========================
  // 검색 초기화
  // =========================

  clearSearchBtn.addEventListener(
    "click",
    () => {

      searchInput.value =
        "";

      applySearchFilter();

    }
  );



  // =========================
  // 로그인 버튼
  // =========================

  loginBtn.addEventListener(
    "click",
    () => {

      loginEmail.value =
        "";

      loginPassword.value =
        "";

      loginModal.classList.remove(
        "hidden"
      );

    }
  );



  // =========================
  // 로그인 버튼 클릭
  // =========================

  submitLoginBtn.addEventListener(
    "click",
    handleLogin
  );



  // =========================
  // 로그인창 엔터키 로그인
  // =========================

  loginEmail.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {

        e.preventDefault();

        handleLogin();

      }

    }
  );

  loginPassword.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {

        e.preventDefault();

        handleLogin();

      }

    }
  );



  // =========================
  // 로그아웃
  // =========================

  logoutBtn.addEventListener(
    "click",
    async () => {

      await supabaseClient.auth
        .signOut();

      currentUser =
        null;

      applyAuthUI();

      showToast("로그아웃 완료");

    }
  );



  // =========================
  // 로그인창 닫기
  // =========================

  closeLoginBtn.addEventListener(
    "click",
    () => {

      loginModal.classList.add(
        "hidden"
      );

    }
  );



  // =========================
  // 일정 추가 버튼
  // =========================

  addEventBtn.addEventListener(
    "click",
    () => {

      if (!isAdmin) return;

      openModalForNewEvent();

    }
  );



  // =========================
  // 이미지 미리보기 + 대표색 추출
  // =========================

  imageInput.addEventListener(
    "change",
    async function () {

      if (!isAdmin) return;

      const file =
        this.files[0];

      if (!file) return;

      const previewUrl =
        URL.createObjectURL(file);

      previewImage.src =
        previewUrl;

      previewImage.style.display =
        "block";

      uploadedColor =
        await extractAverageColor(file);

    }
  );



  // =========================
  // 일정 저장
  // =========================

  saveBtn.addEventListener(
    "click",
    async () => {

      if (!isAdmin) return;

      const title =
        titleInput.value.trim();

      const start =
        startInput.value;

      const end =
        endInput.value;

      const file =
        imageInput.files[0];

      if (!title || !start) {

        alert("제목과 시작일을 입력하세요.");

        return;

      }

      if (file) {

        const imageUrl =
          await uploadImageToSupabase(
            file
          );

        if (!imageUrl) return;

        uploadedImage =
          imageUrl;

      }

      if (currentEvent) {

        const eventData = {

          id:
            currentEvent.id,

          title,

          start,

          end,

          extendedProps: {
            image:
              uploadedImage || "",

            color:
              uploadedColor || "#1f2937",
          },

        };

        const ok =
          await updateEventInSupabase(
            eventData
          );

        if (!ok) return;

        currentEvent.setProp(
          "title",
          title
        );

        currentEvent.setStart(
          start
        );

        currentEvent.setEnd(
          end || null
        );

        currentEvent.setExtendedProp(
          "image",
          uploadedImage || ""
        );

        currentEvent.setExtendedProp(
          "color",
          uploadedColor || "#1f2937"
        );

        allEvents =
          allEvents.map(event => {

            if (event.id === eventData.id) {

              return eventData;

            }

            return event;

          });

        applySearchFilter();

        showToast("수정 완료");

      } else {

        const eventData = {

          id:
            Date.now().toString(),

          title,

          start,

          end,

          extendedProps: {
            image:
              uploadedImage || "",

            color:
              uploadedColor || "#1f2937",
          },

        };

        const ok =
          await insertEventToSupabase(
            eventData
          );

        if (!ok) return;

        allEvents.push(eventData);

        applySearchFilter();

        showToast("추가 완료");

      }

      eventModal.classList.add(
        "hidden"
      );

    }
  );



  // =========================
  // 일정 삭제
  // =========================

  deleteBtn.addEventListener(
    "click",
    async () => {

      if (!isAdmin) return;

      if (!currentEvent) return;

      const okConfirm =
        confirm("정말 삭제할까요?");

      if (!okConfirm) return;

      const deletedEventId =
        currentEvent.id;

      const ok =
        await deleteEventFromSupabase(
          deletedEventId
        );

      if (!ok) return;

      allEvents =
        allEvents.filter(event => {

          return event.id !== deletedEventId;

        });

      applySearchFilter();

      showToast("삭제 완료");

      eventModal.classList.add(
        "hidden"
      );

    }
  );



  // =========================
  // 이벤트 편집창 닫기
  // =========================

  closeEventBtn.addEventListener(
    "click",
    () => {

      eventModal.classList.add(
        "hidden"
      );

    }
  );



  // =========================
  // 모달 바깥 클릭 시 닫기
  // =========================

  loginModal.addEventListener(
    "click",
    (e) => {

      if (e.target === loginModal) {

        loginModal.classList.add(
          "hidden"
        );

      }

    }
  );

  eventModal.addEventListener(
    "click",
    (e) => {

      if (e.target === eventModal) {

        eventModal.classList.add(
          "hidden"
        );

      }

    }
  );



  // =========================
  // ESC 키로 모달 닫기
  // =========================

  document.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Escape") {

        loginModal.classList.add(
          "hidden"
        );

        eventModal.classList.add(
          "hidden"
        );

      }

    }
  );

});