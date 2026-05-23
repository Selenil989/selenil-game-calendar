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

  const CATEGORY_DEFAULT =
    "업데이트";

  const supabaseClient =
    supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );



  // =========================
  // 공통 함수
  // =========================

  function getEl(id) {
    return document.getElementById(id);
  }

  function safeValue(el, defaultValue = "") {
    return el ? el.value : defaultValue;
  }

  function setValue(el, value) {
    if (el) {
      el.value = value || "";
    }
  }

  function show(el) {
    if (el) {
      el.classList.remove("hidden");
    }
  }

  function hide(el) {
    if (el) {
      el.classList.add("hidden");
    }
  }



  // =========================
  // HTML 요소 가져오기
  // =========================

  const calendarEl =
    getEl("calendar");

  const loginBtn =
    getEl("loginBtn");

  const logoutBtn =
    getEl("logoutBtn");

  const addEventBtn =
    getEl("addEventBtn");

  const loginStatus =
    getEl("loginStatus");

  const loginModal =
    getEl("loginModal");

  const eventModal =
    getEl("eventModal");

  const loginEmail =
    getEl("loginEmail");

  const loginPassword =
    getEl("loginPassword");

  const submitLoginBtn =
    getEl("submitLoginBtn");

  const closeLoginBtn =
    getEl("closeLoginBtn");

  const titleInput =
    getEl("eventTitle");

  const startInput =
    getEl("eventStart");

  const endInput =
    getEl("eventEnd");

  const categoryInput =
    getEl("eventCategory");

  const descriptionInput =
    getEl("eventDescription");

  const imageInput =
    getEl("eventImage");

  const previewImage =
    getEl("previewImage");

  // =========================
  // 메인 이벤트 이미지 위치 슬라이더
  // =========================

  const eventImagePosX =
    getEl("eventImagePosX");

  const eventImagePosY =
    getEl("eventImagePosY");

  const saveBtn =
    getEl("saveBtn");

  const deleteBtn =
    getEl("deleteBtn");

  const closeEventBtn =
    getEl("closeEventBtn");

  const toast =
    getEl("toast");

  const searchInput =
    getEl("searchInput");

  const clearSearchBtn =
    getEl("clearSearchBtn");

  const editMainEventBtn =
    getEl("editMainEventBtn");

  // =========================
  // 상세 보기 모달 요소
  // =========================

  const detailModal =
    getEl("detailModal");

  const detailImage =
    getEl("detailImage");

  const detailTitle =
    getEl("detailTitle");

  const detailCategory =
    getEl("detailCategory");

  const detailPeriod =
    getEl("detailPeriod");

  const detailDescription =
    getEl("detailDescription");

  const subEventList =
    getEl("subEventList");

  const addSubEventBtn =
    getEl("addSubEventBtn");

  const closeDetailBtn =
    getEl("closeDetailBtn");



  // =========================
  // 하위 이벤트 편집 모달 요소
  // =========================

  const subEventModal =
    getEl("subEventModal");

  const subTitleInput =
    getEl("subEventTitle");

  const subStartInput =
    getEl("subEventStart");

  const subEndInput =
    getEl("subEventEnd");

  const subCategoryInput =
    getEl("subEventCategory");

  const subDescriptionInput =
    getEl("subEventDescription");

  const subImageInput =
    getEl("subEventImage");

  const subPreviewImage =
    getEl("subPreviewImage");

  // =========================
  // 하위 이벤트 이미지 위치 슬라이더
  // =========================

  const subImagePosX =
    getEl("subImagePosX");

  const subImagePosY =
    getEl("subImagePosY");

  const saveSubEventBtn =
    getEl("saveSubEventBtn");

  const deleteSubEventBtn =
    getEl("deleteSubEventBtn");

  const closeSubEventBtn =
    getEl("closeSubEventBtn");



  // =========================
  // 현재 상태
  // =========================

  let currentUser = null;

  let isAdmin = false;

  let currentEvent = null;

  let currentDetailEvent = null;

  let currentSubEvent = null;

  let uploadedImage = "";

  let uploadedColor = "#1f2937";



  // =========================
  // 메인 이벤트 이미지 위치
  // =========================

  let uploadedImagePosX = 50;
  let uploadedImagePosY = 50;

  let uploadedSubImage = "";

  let uploadedSubColor = "#1f2937";

  // =========================
  // 하위 이벤트 이미지 위치
  // =========================

  let uploadedSubImagePosX = 50;
  let uploadedSubImagePosY = 50;

  let calendar = null;

  let allEvents = [];

  let currentSubEvents = [];



  // =========================
  // 토스트 알림
  // =========================

  function showToast(message) {

    if (!toast) return;

    toast.textContent =
      message || "저장 완료";

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 2000);

  }



  // =========================
  // 날짜 표시
  // =========================

  function formatDate(dateText) {

    if (!dateText) return "";

    return dateText.replaceAll("-", ".");

  }

  function formatPeriod(start, end) {

    if (!end) {
      return formatDate(start);
    }

    return `${formatDate(start)} ~ ${formatDate(end)}`;

  }



  // =========================
  // 관리자 UI 적용
  // =========================

  function applyAuthUI() {

    isAdmin =
      currentUser?.email === ADMIN_EMAIL;

    if (isAdmin) {

      loginBtn?.classList.add("hidden");
      logoutBtn?.classList.remove("hidden");
      addEventBtn?.classList.remove("hidden");

      if (loginStatus) {
        loginStatus.textContent =
          "관리자 모드";
      }

      addSubEventBtn?.classList.remove("hidden");

    } else {

      loginBtn?.classList.remove("hidden");
      logoutBtn?.classList.add("hidden");
      addEventBtn?.classList.add("hidden");

      if (loginStatus) {
        loginStatus.textContent =
          "방문자 모드";
      }

      hide(eventModal);
      addSubEventBtn?.classList.add("hidden");

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
  // 메인 이벤트 불러오기
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

        // 이미지 위치
        imagePosX: item.image_pos_x ?? 50,
        imagePosY: item.image_pos_y ?? 50,

        category: item.category || CATEGORY_DEFAULT,
        description: item.description || "",
      },
    }));

  }



  // =========================
  // 메인 이벤트 추가
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

          category:
            eventData.extendedProps.category || CATEGORY_DEFAULT,

          description:
            eventData.extendedProps.description || "",

          // 이미지 위치 저장
          image_pos_x:
            eventData.extendedProps.imagePosX ?? 50,

          image_pos_y:
            eventData.extendedProps.imagePosY ?? 50,

        });

    if (error) {

      console.error(error);

      alert("일정 추가 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 메인 이벤트 수정
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

          category:
            eventData.extendedProps.category || CATEGORY_DEFAULT,

          description:
            eventData.extendedProps.description || "",

          // 이미지 위치 저장
          image_pos_x:
            eventData.extendedProps.imagePosX ?? 50,

          image_pos_y:
            eventData.extendedProps.imagePosY ?? 50,

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
  // 메인 이벤트 삭제
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
  // 하위 이벤트 불러오기
  // =========================

  async function loadSubEvents(eventId) {

    const { data, error } =
      await supabaseClient
        .from("sub_events")
        .select("*")
        .eq("event_id", eventId)
        .order("start_date", {
          ascending: true
        });

    if (error) {

      console.error(error);

      alert("하위 이벤트를 불러오지 못했습니다.");

      return [];

    }

    return data || [];

  }



  // =========================
  // 하위 이벤트 추가
  // =========================

  async function insertSubEventToSupabase(subData) {

    const { error } =
      await supabaseClient
        .from("sub_events")
        .insert(subData);

    if (error) {

      console.error(error);

      alert("하위 이벤트 추가 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 하위 이벤트 수정
  // =========================

  async function updateSubEventInSupabase(subData) {

    const { error } =
      await supabaseClient
        .from("sub_events")
        .update({

          title: subData.title,

          start_date: subData.start_date || null,

          end_date: subData.end_date || null,

          category:
            subData.category || CATEGORY_DEFAULT,

          description:
            subData.description || "",

          image_url:
            subData.image_url || "",

          color:
            subData.color || "#1f2937",

          // 이미지 위치 저장
          image_pos_x:
            subData.image_pos_x ?? 50,

          image_pos_y:
            subData.image_pos_y ?? 50,

        })
        .eq("id", subData.id);

    if (error) {

      console.error(error);

      alert("하위 이벤트 수정 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 하위 이벤트 삭제
  // =========================

  async function deleteSubEventFromSupabase(subEventId) {

    const { error } =
      await supabaseClient
        .from("sub_events")
        .delete()
        .eq("id", subEventId);

    if (error) {

      console.error(error);

      alert("하위 이벤트 삭제 실패");

      return false;

    }

    return true;

  }



  // =========================
  // 이미지 업로드
  // =========================

  async function uploadImageToSupabase(file) {

    if (!file) {

      return "";

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

      reader.onload = function (e) {

        const img =
          new Image();

        img.onload = function () {

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
  // 기존 메인 이벤트 편집창 열기
  // =========================

  function openModalForEvent(event) {

    currentEvent =
      event;

    setValue(titleInput, event.title);

    setValue(startInput, event.startStr);

    setValue(endInput, event.endStr || "");

    setValue(
      categoryInput,
      event.extendedProps.category || CATEGORY_DEFAULT
    );

    setValue(
      descriptionInput,
      event.extendedProps.description || ""
    );

    uploadedImage =
      event.extendedProps.image || "";

    uploadedColor =
      event.extendedProps.color || "#1f2937";

    // =========================
    // 메인 이벤트 기존 이미지 위치 불러오기
    // =========================

    uploadedImagePosX =
      event.extendedProps.imagePosX ?? 50;

    uploadedImagePosY =
      event.extendedProps.imagePosY ?? 50;

    // 슬라이더 UI 반영
    setValue(
      eventImagePosX,
      uploadedImagePosX
    );

    setValue(
      eventImagePosY,
      uploadedImagePosY
    );

    if (imageInput) {
      imageInput.value = "";
    }

    if (uploadedImage && previewImage) {

      previewImage.src =
        uploadedImage;

      previewImage.style.display =
        "block";

    } else if (previewImage) {

      previewImage.style.display =
        "none";

    }

    show(eventModal);

  }



  // =========================
  // 새 메인 이벤트 편집창 열기
  // =========================

  function openModalForNewEvent(startDate = "") {

    currentEvent =
      null;

    setValue(titleInput, "");

    setValue(startInput, startDate);

    setValue(endInput, "");

    setValue(categoryInput, CATEGORY_DEFAULT);

    setValue(descriptionInput, "");

    uploadedImage =
      "";

    uploadedColor =
      "#1f2937";

    // =========================
    // 신규 메인 이벤트 이미지 위치 기본값
    // 50 = 중앙
    // =========================

    uploadedImagePosX = 50;
    uploadedImagePosY = 50;

    // 메인 이미지 위치 슬라이더 초기화
    setValue(eventImagePosX, 50);
    setValue(eventImagePosY, 50);

    if (imageInput) {
      imageInput.value = "";
    }

    if (previewImage) {
      previewImage.style.display =
        "none";
    }

    show(eventModal);

  }



  // =========================
  // 로그인 실행
  // =========================

  async function handleLogin() {

    const email =
      safeValue(loginEmail).trim();

    const password =
      safeValue(loginPassword);

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

    setValue(loginPassword, "");

    hide(loginModal);

    showToast("로그인 완료");

  }



  // =========================
  // 검색 적용
  // =========================

  function applySearchFilter() {

    if (!calendar) return;

    const keyword =
      safeValue(searchInput).trim().toLowerCase();

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
  // 카테고리 뱃지 HTML
  // =========================

  function getCategoryBadge(category) {

    const safeCategory =
      category || CATEGORY_DEFAULT;

    return `
      <span class="category-badge category-${safeCategory}">
        ${safeCategory}
      </span>
    `;

  }



  // =========================
  // 하위 이벤트 목록 렌더링
  // =========================

  function renderSubEvents() {

    if (!subEventList) return;

    subEventList.innerHTML = "";

    if (currentSubEvents.length === 0) {

      subEventList.innerHTML =
        `<div class="empty-sub-events">등록된 하위 이벤트가 없습니다.</div>`;

      return;

    }

    currentSubEvents.forEach(subEvent => {

      const card =
        document.createElement("div");

      card.className =
        "sub-event-card";

      card.style.setProperty(
        "--event-color",
        subEvent.color || "#1f2937"
      );

   // =========================
// 하위 이벤트 이미지 위치
// DB에 값이 없으면 기본값 50 사용
// 50 = 가운데 위치
// =========================

const imagePosX =
  subEvent.image_pos_x ?? 50;

const imagePosY =
  subEvent.image_pos_y ?? 50;


// =========================
// 하위 이벤트 이미지 HTML 생성
// 이미지가 있으면 cover 방식으로 꽉 채움
// object-position으로 슬라이더 위치 적용
// 이미지가 없으면 대표색 배경만 표시
// =========================

const imageHtml =
  subEvent.image_url
    ? `
      <div class="sub-event-image-wrap">

        <!-- 하위 이벤트 카드 이미지 -->
        <img
          src="${subEvent.image_url}"
          style="object-position: ${imagePosX}% ${imagePosY}%;"
        />

      </div>
    `
    : `
      <!-- 이미지가 없는 하위 이벤트용 배경 -->
      <div class="sub-event-image-wrap no-sub-image"></div>
    `;

      card.innerHTML =
        `
          ${imageHtml}

          <div class="sub-event-body">

            <div class="sub-event-top">
              ${getCategoryBadge(subEvent.category)}
              <span class="sub-event-period">
                ${formatPeriod(subEvent.start_date, subEvent.end_date)}
              </span>
            </div>

            <div class="sub-event-title">
              ${subEvent.title}
            </div>

            <div class="sub-event-description">
              ${subEvent.description || ""}
            </div>

          </div>
        `;

      if (isAdmin) {

        card.addEventListener(
          "dblclick",
          () => {

            openSubEventModal(subEvent);

          }
        );

      }

      subEventList.appendChild(card);

    });

  }



  // =========================
  // 메인 이벤트 상세창 열기
  // =========================

  async function openDetailModal(event) {

    currentDetailEvent =
      event;

    if (detailImage) {

      if (event.extendedProps.image) {

        detailImage.src =
          event.extendedProps.image;

        detailImage.style.display =
          "block";

      } else {

        detailImage.style.display =
          "none";

      }

    }

    if (detailTitle) {
      detailTitle.textContent =
        event.title;
    }

    if (detailCategory) {
      detailCategory.innerHTML =
        getCategoryBadge(
          event.extendedProps.category
        );
    }

    if (detailPeriod) {
      detailPeriod.textContent =
        formatPeriod(
          event.startStr,
          event.endStr
        );
    }

    if (detailDescription) {
      detailDescription.textContent =
        event.extendedProps.description || "";
    }

    if (editMainEventBtn) {

      if (isAdmin) {

        editMainEventBtn.classList.remove("hidden");

      } else {

        editMainEventBtn.classList.add("hidden");

      }

    }

    if (addSubEventBtn) {
      if (isAdmin) {
        addSubEventBtn.classList.remove("hidden");
      } else {
        addSubEventBtn.classList.add("hidden");
      }
    }

    currentSubEvents =
      await loadSubEvents(event.id);

    renderSubEvents();

    show(detailModal);

  }



  // =========================
  // 하위 이벤트 편집창 열기
  // =========================

  function openSubEventModal(subEvent = null) {

    currentSubEvent =
      subEvent;

    setValue(
      subTitleInput,
      subEvent?.title || ""
    );

    setValue(
      subStartInput,
      subEvent?.start_date || ""
    );

    setValue(
      subEndInput,
      subEvent?.end_date || ""
    );

    setValue(
      subCategoryInput,
      subEvent?.category || CATEGORY_DEFAULT
    );

    setValue(
      subDescriptionInput,
      subEvent?.description || ""
    );

    uploadedSubImage =
      subEvent?.image_url || "";

    uploadedSubColor =
      subEvent?.color || "#1f2937";

    // =========================
    // 하위 이벤트 기존 이미지 위치
    // =========================

    uploadedSubImagePosX =
      subEvent?.image_pos_x ?? 50;

    uploadedSubImagePosY =
      subEvent?.image_pos_y ?? 50;

    // 슬라이더 반영
    setValue(
      subImagePosX,
      uploadedSubImagePosX
    );

    setValue(
      subImagePosY,
      uploadedSubImagePosY
    );


    if (subImageInput) {
      subImageInput.value = "";
    }

    if (uploadedSubImage && subPreviewImage) {

      subPreviewImage.src =
        uploadedSubImage;

      subPreviewImage.style.display =
        "block";

    } else if (subPreviewImage) {

      subPreviewImage.style.display =
        "none";

    }

    if (deleteSubEventBtn) {

      if (subEvent) {
        deleteSubEventBtn.classList.remove("hidden");
      } else {
        deleteSubEventBtn.classList.add("hidden");
      }

    }

    show(subEventModal);

  }



  // =========================
  // 메인 이벤트 로드
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

      dateClick: function (info) {

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

      eventDrop: async function (info) {

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

            category:
              info.event.extendedProps.category || CATEGORY_DEFAULT,

            description:
              info.event.extendedProps.description || "",

            // 드래그 이동 시 기존 이미지 위치 유지
            imagePosX:
              info.event.extendedProps.imagePosX ?? 50,

            imagePosY:
              info.event.extendedProps.imagePosY ?? 50,
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
      // =========================

      eventContent: function (info) {

        const image =
          info.event.extendedProps.image;

        const color =
          info.event.extendedProps.color || "#1f2937";

        // =========================
        // 메인 이벤트 이미지 위치
        // =========================

        const imagePosX =
          info.event.extendedProps.imagePosX ?? 50;

        const imagePosY =
          info.event.extendedProps.imagePosY ?? 50;

        const category =
          info.event.extendedProps.category || CATEGORY_DEFAULT;

        const imageHtml =
          image
            ? `
              <div class="event-image-zone">
                <!-- =========================
     메인 이벤트 이미지
========================= -->
<img
  src="${image}"
  style="
    object-position:
      ${imagePosX}%
      ${imagePosY}%;
  "
/>
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

                ${getCategoryBadge(category)}

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

      eventDidMount: function (info) {

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

        // 클릭 = 상세 보기
        info.el.addEventListener(
          "click",
          () => {

            openDetailModal(
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

  searchInput?.addEventListener(
    "input",
    applySearchFilter
  );



  // =========================
  // 검색 초기화
  // =========================

  clearSearchBtn?.addEventListener(
    "click",
    () => {

      setValue(searchInput, "");

      applySearchFilter();

    }
  );



  // =========================
  // 로그인 버튼
  // =========================

  loginBtn?.addEventListener(
    "click",
    () => {

      setValue(loginEmail, "");

      setValue(loginPassword, "");

      show(loginModal);

    }
  );



  // =========================
  // 로그인 버튼 클릭
  // =========================

  submitLoginBtn?.addEventListener(
    "click",
    handleLogin
  );



  // =========================
  // 로그인창 엔터키 로그인
  // =========================

  loginEmail?.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {

        e.preventDefault();

        handleLogin();

      }

    }
  );

  loginPassword?.addEventListener(
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

  logoutBtn?.addEventListener(
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

  closeLoginBtn?.addEventListener(
    "click",
    () => {

      hide(loginModal);

    }
  );



  // =========================
  // 일정 추가 버튼
  // =========================

  addEventBtn?.addEventListener(
    "click",
    () => {

      if (!isAdmin) return;

      openModalForNewEvent();

    }
  );



  // =========================
  // 메인 이미지 미리보기 + 대표색 추출
  // =========================

  imageInput?.addEventListener(
    "change",
    async function () {

      if (!isAdmin) return;

      const file =
        this.files[0];

      if (!file) return;

      const previewUrl =
        URL.createObjectURL(file);

      if (previewImage) {

        previewImage.src =
          previewUrl;

        previewImage.style.display =
          "block";

      }

      uploadedColor =
        await extractAverageColor(file);

    }
  );


  // =========================
  // 상세창 메인 이벤트 수정 버튼
  // =========================

  editMainEventBtn?.addEventListener(
    "click",
    () => {

      if (!isAdmin) return;

      if (!currentDetailEvent) return;

      hide(detailModal);

      openModalForEvent(
        currentDetailEvent
      );

    }
  );


  // =========================
  // 메인 일정 저장
  // =========================

  saveBtn?.addEventListener(
    "click",
    async () => {

      if (!isAdmin) return;

      const title =
        safeValue(titleInput).trim();

      const start =
        safeValue(startInput);

      const end =
        safeValue(endInput);

      const category =
        safeValue(categoryInput, CATEGORY_DEFAULT) || CATEGORY_DEFAULT;

      const description =
        safeValue(descriptionInput);

      const file =
        imageInput?.files[0];

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

      const eventData = {

        id:
          currentEvent
            ? currentEvent.id
            : Date.now().toString(),

        title,

        start,

        end,

        extendedProps: {
          image:
            uploadedImage || "",

          color:
            uploadedColor || "#1f2937",

          // =========================
          // 이미지 위치 저장
          // =========================
          imagePosX:
            Number(
              safeValue(eventImagePosX, 50)
            ),

          imagePosY:
            Number(
              safeValue(eventImagePosY, 50)
            ),

          category,

          description,
        },

      };

      const ok =
        currentEvent
          ? await updateEventInSupabase(eventData)
          : await insertEventToSupabase(eventData);

      if (!ok) return;

      if (currentEvent) {

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

        currentEvent.setExtendedProp(
          "category",
          category
        );

        currentEvent.setExtendedProp(
          "description",
          description
        );

        // =========================
        // 이미지 위치 즉시 반영
        // =========================

        currentEvent.setExtendedProp(
          "imagePosX",
          Number(
            safeValue(eventImagePosX, 50)
          )
        );

        currentEvent.setExtendedProp(
          "imagePosY",
          Number(
            safeValue(eventImagePosY, 50)
          )
        );

        allEvents =
          allEvents.map(event => {

            if (event.id === eventData.id) {
              return eventData;
            }

            return event;

          });

        showToast("수정 완료");

      } else {

        allEvents.push(eventData);

        showToast("추가 완료");

      }

      applySearchFilter();

      hide(eventModal);

    }
  );



  // =========================
  // 메인 일정 삭제
  // =========================

  deleteBtn?.addEventListener(
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

      hide(eventModal);

    }
  );



  // =========================
  // 하위 이벤트 추가 버튼
  // =========================

  addSubEventBtn?.addEventListener(
    "click",
    () => {

      if (!isAdmin) return;

      if (!currentDetailEvent) return;

      openSubEventModal();

    }
  );



  // =========================
  // 하위 이미지 미리보기 + 대표색 추출
  // =========================

  subImageInput?.addEventListener(
    "change",
    async function () {

      if (!isAdmin) return;

      const file =
        this.files[0];

      if (!file) return;

      const previewUrl =
        URL.createObjectURL(file);

      if (subPreviewImage) {

        subPreviewImage.src =
          previewUrl;

        subPreviewImage.style.display =
          "block";

      }

      uploadedSubColor =
        await extractAverageColor(file);

    }
  );



  // =========================
  // 하위 이벤트 저장
  // =========================

  saveSubEventBtn?.addEventListener(
    "click",
    async () => {

      if (!isAdmin) return;

      if (!currentDetailEvent) return;

      const title =
        safeValue(subTitleInput).trim();

      const startDate =
        safeValue(subStartInput);

      const endDate =
        safeValue(subEndInput);

      const category =
        safeValue(subCategoryInput, CATEGORY_DEFAULT) || CATEGORY_DEFAULT;

      const description =
        safeValue(subDescriptionInput);

      const file =
        subImageInput?.files[0];

      if (!title) {

        alert("하위 이벤트 제목을 입력하세요.");

        return;

      }

      if (file) {

        const imageUrl =
          await uploadImageToSupabase(
            file
          );

        if (!imageUrl) return;

        uploadedSubImage =
          imageUrl;

      }

      const subData = {

        id:
          currentSubEvent
            ? currentSubEvent.id
            : Date.now().toString(),

        event_id:
          currentDetailEvent.id,

        title,

        start_date:
          startDate || null,

        end_date:
          endDate || null,

        category,

        description,

        image_url:
          uploadedSubImage || "",

        color:
          uploadedSubColor || "#1f2937",

        // =========================
        // 하위 이미지 위치 저장
        // =========================

        image_pos_x:
          Number(
            safeValue(subImagePosX, 50)
          ),

        image_pos_y:
          Number(
            safeValue(subImagePosY, 50)
          ),

      };

      const ok =
        currentSubEvent
          ? await updateSubEventInSupabase(subData)
          : await insertSubEventToSupabase(subData);

      if (!ok) return;

      currentSubEvents =
        await loadSubEvents(
          currentDetailEvent.id
        );

      renderSubEvents();

      hide(subEventModal);

      showToast(
        currentSubEvent
          ? "하위 이벤트 수정 완료"
          : "하위 이벤트 추가 완료"
      );

    }
  );



  // =========================
  // 하위 이벤트 삭제
  // =========================

  deleteSubEventBtn?.addEventListener(
    "click",
    async () => {

      if (!isAdmin) return;

      if (!currentSubEvent) return;

      const okConfirm =
        confirm("하위 이벤트를 삭제할까요?");

      if (!okConfirm) return;

      const ok =
        await deleteSubEventFromSupabase(
          currentSubEvent.id
        );

      if (!ok) return;

      currentSubEvents =
        await loadSubEvents(
          currentDetailEvent.id
        );

      renderSubEvents();

      hide(subEventModal);

      showToast("하위 이벤트 삭제 완료");

    }
  );



  // =========================
  // 닫기 버튼들
  // =========================

  closeEventBtn?.addEventListener(
    "click",
    () => {

      hide(eventModal);

    }
  );

  closeDetailBtn?.addEventListener(
    "click",
    () => {

      hide(detailModal);

    }
  );

  closeSubEventBtn?.addEventListener(
    "click",
    () => {

      hide(subEventModal);

    }
  );



  // =========================
  // 모달 바깥 클릭 시 닫기
  // =========================

  loginModal?.addEventListener(
    "click",
    (e) => {

      if (e.target === loginModal) {
        hide(loginModal);
      }

    }
  );

  eventModal?.addEventListener(
    "click",
    (e) => {

      if (e.target === eventModal) {
        hide(eventModal);
      }

    }
  );

  detailModal?.addEventListener(
    "click",
    (e) => {

      if (e.target === detailModal) {
        hide(detailModal);
      }

    }
  );

  subEventModal?.addEventListener(
    "click",
    (e) => {

      if (e.target === subEventModal) {
        hide(subEventModal);
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

        hide(loginModal);
        hide(eventModal);
        hide(detailModal);
        hide(subEventModal);

      }

    }
  );

});