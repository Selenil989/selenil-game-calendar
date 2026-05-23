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



  // =========================
  // 현재 상태
  // =========================

  let currentUser = null;

  let isAdmin = false;

  let currentEvent = null;

  let uploadedImage = "";

  let calendar = null;



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
        `관리자 모드: ${currentUser.email}`;

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

    const { data, error } =
      await supabaseClient.auth.getUser();

    if (error) {

      console.error(error);

      currentUser = null;

    } else {

      currentUser =
        data.user || null;

    }

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

    imageInput.value =
      "";

    previewImage.style.display =
      "none";

    eventModal.classList.remove("hidden");

  }



  // =========================
  // 로그인 실행 함수
  // 버튼 클릭 / 엔터키 공용
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
  // 일정 먼저 불러오기
  // =========================

  const loadedEvents =
    await loadEventsFromSupabase();



  // =========================
  // FullCalendar 생성
  // =========================

  calendar =
    new FullCalendar.Calendar(calendarEl, {

      initialView:
        "dayGridMonth",

      editable:
        false,

      height:
        "auto",

      dayMaxEvents:
        true,

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

        showToast("이동 저장 완료");

      },

      events:
        loadedEvents,

      eventContent: function(info) {

        const image =
          info.event.extendedProps.image;

        const imageHtml =
          image
            ? `<img src="${image}" />`
            : `<div class="no-image"></div>`;

        return {

          html: `
            <div class="game-event">

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

      eventDidMount: function(info) {

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
  // 이미지 미리보기
  // =========================

  imageInput.addEventListener(
    "change",
    function () {

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
          },

        };

        const ok =
          await insertEventToSupabase(
            eventData
          );

        if (!ok) return;

        calendar.addEvent(
          eventData
        );

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

      const ok =
        await deleteEventFromSupabase(
          currentEvent.id
        );

      if (!ok) return;

      currentEvent.remove();

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
