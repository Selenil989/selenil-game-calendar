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
      el.value = value ?? "";

      if (el.type === "range") {
        const numberInput =
          el.closest(".range-number-row")
            ?.querySelector(".range-number-input");

        if (numberInput) {
          numberInput.value = el.value;
        }
      }
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
  // =========================
  // 메인 이벤트 이미지 위치 슬라이더
  // =========================

  const eventImagePosX =
    getEl("eventImagePosX");

  const eventImagePosY =
    getEl("eventImagePosY");

  // =========================
  // 메인 이벤트 이미지 확대 슬라이더
  // =========================

  const eventImageZoom =
    getEl("eventImageZoom");

  const eventTextColor =
    getEl("eventTextColor");

  const eventTextBgColor =
    getEl("eventTextBgColor");

  const eventTextBgAlpha =
    getEl("eventTextBgAlpha");

  const eventTextSize =
    getEl("eventTextSize");

  // =========================
  // 메인 이벤트 안 하위 이벤트 배너 이미지 조절 UI
  // =========================

  const mainSubCalendarSelect =
    getEl("mainSubCalendarSelect");

  const mainSubCalendarImagePosX =
    getEl("mainSubCalendarImagePosX");

  const mainSubCalendarImagePosY =
    getEl("mainSubCalendarImagePosY");

  const mainSubCalendarImageZoom =
    getEl("mainSubCalendarImageZoom");

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
  // 캘린더 설정 요소
  // =========================

  const calendarMainTitle =
    getEl("calendarMainTitle");

  const editCalendarSettingsBtn =
    getEl("editCalendarSettingsBtn");

  const calendarSettingsModal =
    getEl("calendarSettingsModal");

  const calendarTitleInput =
    getEl("calendarTitleInput");

  const calendarHeroList =
    getEl("calendarHeroList");

  const saveCalendarSettingsBtn =
    getEl("saveCalendarSettingsBtn");

  const closeCalendarSettingsBtn =
    getEl("closeCalendarSettingsBtn");

  const defaultTextColorInput =
    getEl("defaultTextColorInput");

  const defaultTextBgColorInput =
    getEl("defaultTextBgColorInput");

  const defaultTextBgAlphaInput =
    getEl("defaultTextBgAlphaInput");

  const defaultTextSizeInput =
    getEl("defaultTextSizeInput");

  const heroTextColorInput =
    getEl("heroTextColorInput");

  const heroTextBgColorInput =
    getEl("heroTextBgColorInput");

  const heroTextBgAlphaInput =
    getEl("heroTextBgAlphaInput");

  const heroTextSizeInput =
    getEl("heroTextSizeInput");

  const calendarHeroSelect =
    getEl("calendarHeroSelect");

  const addCalendarHeroBtn =
    getEl("addCalendarHeroBtn");

  const deleteCalendarHeroBtn =
    getEl("deleteCalendarHeroBtn");

  const calendarHeroEditor =
    getEl("calendarHeroEditor");

  const calendarHeroEditorPreview =
    getEl("calendarHeroEditorPreview");

  const calendarHeroImageInput =
    getEl("calendarHeroImageInput");

  const calendarHeroTextInput =
    getEl("calendarHeroTextInput");

  const calendarHeroPosX =
    getEl("calendarHeroPosX");

  const calendarHeroPosY =
    getEl("calendarHeroPosY");

  const calendarHeroZoom =
    getEl("calendarHeroZoom");

  const calendarHeroTextColor =
    getEl("calendarHeroTextColor");

  const calendarHeroTextBgColor =
    getEl("calendarHeroTextBgColor");

  const calendarHeroTextBgAlpha =
    getEl("calendarHeroTextBgAlpha");

  const calendarHeroTextSize =
    getEl("calendarHeroTextSize");

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
  // =========================
  // 하위 이벤트 이미지 위치 슬라이더
  // =========================

  const subImagePosX =
    getEl("subImagePosX");

  const subImagePosY =
    getEl("subImagePosY");

  // =========================
  // 하위 이벤트 이미지 확대 슬라이더
  // =========================

  const subImageZoom =
    getEl("subImageZoom");

  const subTextColor =
    getEl("subTextColor");

  const subTextBgColor =
    getEl("subTextBgColor");

  const subTextBgAlpha =
    getEl("subTextBgAlpha");

  const subTextSize =
    getEl("subTextSize");

  // =========================
  // 현재 편집 중인 메인 이벤트의
  // 실제 캘린더 이미지 찾기
  // =========================

  function findCurrentEventCalendarImage() {

    /* 현재 편집 중인 이벤트가 없으면 종료 */
    if (!currentEvent) return null;

    /* 현재 이벤트 이미지 URL */
    const currentImage =
      currentEvent.extendedProps.image || "";

    if (!currentImage) return null;

    /* 캘린더에 표시된 모든 이벤트 이미지 */
    const eventImages =
      document.querySelectorAll(
        ".fc-event .event-image-zone img"
      );

    /* 이미지 URL이 같은 실제 캘린더 이미지 찾기 */
    for (const img of eventImages) {

      if (img.src === currentImage) {
        return img;
      }

    }

    return null;

  }



  // =========================
  // 메인 이벤트 실제 캘린더 이미지 실시간 반영
  // =========================

  function updateMainPreview() {

    const img =
      findCurrentEventCalendarImage();

    if (!img) return;

    const posX =
      safeValue(eventImagePosX, 50);

    const posY =
      safeValue(eventImagePosY, 50);

    const zoom =
      safeValue(eventImageZoom, 100);

    img.style.objectPosition =
      `${posX}% ${posY}%`;

    img.style.transform =
      `scale(${Number(zoom) / 100})`;

    img.style.transformOrigin =
      `${posX}% ${posY}%`;

  }



  // =========================
  // 현재 편집 중인 하위 이벤트의
  // 실제 상세창 카드 이미지 찾기
  // =========================

  function findCurrentSubEventCardImage() {

    if (!currentSubEvent) return null;

    const card =
      document.querySelector(
        `.sub-event-card[data-sub-event-id="${currentSubEvent.id}"]`
      );

    if (!card) return null;

    return card.querySelector(
      ".sub-event-image-wrap img"
    );

  }



  // =========================
  // 하위 이벤트 실제 카드 이미지 실시간 반영
  // =========================

  function updateSubPreview() {

    const img =
      findCurrentSubEventCardImage();

    if (!img) return;

    const posX =
      safeValue(subImagePosX, 50);

    const posY =
      safeValue(subImagePosY, 50);

    const zoom =
      safeValue(subImageZoom, 100);

    img.style.objectPosition =
      `${posX}% ${posY}%`;

    img.style.transform =
      `scale(${Number(zoom) / 100})`;

    img.style.transformOrigin =
      `${posX}% ${posY}%`;

  }



  // =========================
  // 이미지 위치 / 확대 슬라이더 이벤트 연결
  // =========================

  eventImagePosX?.addEventListener(
    "input",
    updateMainPreview
  );

  eventImagePosY?.addEventListener(
    "input",
    updateMainPreview
  );

  eventImageZoom?.addEventListener(
    "input",
    updateMainPreview
  );

  mainSubCalendarSelect?.addEventListener(
    "change",
    () => {

      currentMainSubCalendarSubId =
        safeValue(mainSubCalendarSelect);

      applySelectedMainSubCalendarValues();

      updateSelectedMainSubCalendarPreview();

    }
  );

  mainSubCalendarImagePosX?.addEventListener(
    "input",
    updateSelectedMainSubCalendarPreview
  );

  mainSubCalendarImagePosY?.addEventListener(
    "input",
    updateSelectedMainSubCalendarPreview
  );

  mainSubCalendarImageZoom?.addEventListener(
    "input",
    updateSelectedMainSubCalendarPreview
  );

  subImagePosX?.addEventListener(
    "input",
    updateSubPreview
  );

  subImagePosY?.addEventListener(
    "input",
    updateSubPreview
  );

  subImageZoom?.addEventListener(
    "input",
    updateSubPreview
  );

  // =========================
  // range 슬라이더 옆 숫자 입력칸 자동 생성
  // 슬라이더와 숫자 입력이 서로 동기화됨
  // =========================

  function setupRangeNumberInputs() {

    const rangeInputs =
      Array.from(
        document.querySelectorAll('input[type="range"]')
      );

    rangeInputs.forEach(rangeInput => {

      if (!rangeInput || rangeInput.dataset.numberLinked === "true") {
        return;
      }

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "range-number-row";

      const numberInput =
        document.createElement("input");

      numberInput.type =
        "number";

      numberInput.className =
        "range-number-input";

      numberInput.min =
        rangeInput.min || "0";

      numberInput.max =
        rangeInput.max || "100";

      numberInput.step =
        rangeInput.step || "1";

      numberInput.value =
        rangeInput.value || rangeInput.min || "0";

      rangeInput.parentNode.insertBefore(
        wrapper,
        rangeInput
      );

      wrapper.appendChild(rangeInput);
      wrapper.appendChild(numberInput);

      rangeInput.dataset.numberLinked =
        "true";

      const clampValue = (value) => {

        const min =
          Number(rangeInput.min || numberInput.min || 0);

        const max =
          Number(rangeInput.max || numberInput.max || 100);

        const numericValue =
          Number(value);

        if (Number.isNaN(numericValue)) {
          return min;
        }

        return Math.min(
          max,
          Math.max(min, numericValue)
        );

      };

      rangeInput.addEventListener(
        "input",
        () => {

          numberInput.value =
            rangeInput.value;

        }
      );

      numberInput.addEventListener(
        "input",
        () => {

          const nextValue =
            clampValue(numberInput.value);

          rangeInput.value =
            nextValue;

          numberInput.value =
            nextValue;

          rangeInput.dispatchEvent(
            new Event("input", {
              bubbles: true,
            })
          );

        }
      );

    });

  }

  setupRangeNumberInputs();

  // =========================
  // 편집 패널 range 조작 중 페이지 스크롤 튐 방지
  // - 서브 배너 이미지 슬라이더 조작 시 브라우저가 포커스 위치로 스크롤을 이동시키는 경우가 있어
  //   현재 창/모달 스크롤 위치를 즉시 복구합니다.
  // =========================

  function setupRangeScrollGuard() {

    const rangeInputs =
      Array.from(
        document.querySelectorAll('input[type="range"]')
      );

    rangeInputs.forEach(rangeInput => {

      if (!rangeInput || rangeInput.dataset.scrollGuardReady === "true") {
        return;
      }

      rangeInput.dataset.scrollGuardReady =
        "true";

      let savedWindowX = 0;
      let savedWindowY = 0;
      let savedModal = null;
      let savedModalScrollTop = 0;

      const saveScrollPosition = () => {

        savedWindowX =
          window.scrollX || window.pageXOffset || 0;

        savedWindowY =
          window.scrollY || window.pageYOffset || 0;

        savedModal =
          rangeInput.closest(".modal-content");

        savedModalScrollTop =
          savedModal?.scrollTop || 0;

      };

      const restoreScrollPosition = () => {

        requestAnimationFrame(() => {

          window.scrollTo(savedWindowX, savedWindowY);

          if (savedModal) {
            savedModal.scrollTop = savedModalScrollTop;
          }

          requestAnimationFrame(() => {
            window.scrollTo(savedWindowX, savedWindowY);

            if (savedModal) {
              savedModal.scrollTop = savedModalScrollTop;
            }
          });

        });

      };

      ["pointerdown", "mousedown", "touchstart", "focus"].forEach(eventName => {
        rangeInput.addEventListener(
          eventName,
          saveScrollPosition,
          { passive: true }
        );
      });

      rangeInput.addEventListener(
        "input",
        () => {
          // 슬라이더 input 이벤트가 발생한 뒤에는 이미 브라우저가 스크롤을 튕겼을 수 있으므로,
          // 여기서 위치를 다시 저장하지 않고 pointerdown/focus 시점에 저장한 위치로만 복구합니다.
          restoreScrollPosition();
        }
      );

      rangeInput.addEventListener(
        "change",
        restoreScrollPosition
      );

    });

  }

  setupRangeScrollGuard();

  [
    eventTextColor,
    eventTextBgColor,
    eventTextBgAlpha,
    eventTextSize,
  ].forEach(input => {

    input?.addEventListener(
      "input",
      updateEventTextStylePreview
    );

  });

  [
    subTextColor,
    subTextBgColor,
    subTextBgAlpha,
    subTextSize,
  ].forEach(input => {

    input?.addEventListener(
      "input",
      updateSubTextStylePreview
    );

  });

  [
    defaultTextColorInput,
    defaultTextBgColorInput,
    defaultTextBgAlphaInput,
    defaultTextSizeInput,
    heroTextColorInput,
    heroTextBgColorInput,
    heroTextBgAlphaInput,
    heroTextSizeInput,
    calendarTitleInput,
  ].forEach(input => {

    input?.addEventListener(
      "input",
      updateCalendarSettingsPreview
    );

  });

  [
    calendarHeroTextInput,
    calendarHeroPosX,
    calendarHeroPosY,
    calendarHeroZoom,
    calendarHeroTextColor,
    calendarHeroTextBgColor,
    calendarHeroTextBgAlpha,
    calendarHeroTextSize,
  ].forEach(input => {

    input?.addEventListener(
      "input",
      updateSelectedHeroItemFromEditor
    );

  });

  calendarHeroSelect?.addEventListener(
    "change",
    () => {
      selectedHeroIndex =
        Number(safeValue(calendarHeroSelect, -1));

      renderHeroEditor();
    }
  );

  addCalendarHeroBtn?.addEventListener(
    "click",
    () => {
      addHeroItem();
    }
  );

  deleteCalendarHeroBtn?.addEventListener(
    "click",
    () => {
      deleteSelectedHeroItem();
    }
  );

  calendarHeroImageInput?.addEventListener(
    "change",
    updateSelectedHeroImagePreview
  );


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

  let calendarSettings = {
    title: "게임 이벤트 스케줄",
    banner_items: [],
    default_text_color: "#ffffff",
    default_text_bg_color: "#000000",
    default_text_bg_alpha: 0.35,
    default_text_size: 13,
    hero_text_color: "#ffffff",
    hero_text_bg_color: "#000000",
    hero_text_bg_alpha: 0.35,
    hero_text_size: 13,
  };

  let editingHeroItems = [];
  let selectedHeroIndex = -1;



  // =========================
  // 메인 이벤트 이미지 위치
  // =========================

  let uploadedImagePosX = 50;
  let uploadedImagePosY = 50;

  /* 메인 이벤트 이미지 확대값 */
  let uploadedImageZoom = 100;

  let uploadedSubImage = "";

  let uploadedSubColor = "#1f2937";

  // =========================
  // 하위 이벤트 이미지 위치
  // =========================

  let uploadedSubImagePosX = 50;
  let uploadedSubImagePosY = 50;

  /* 하위 이벤트 이미지 확대값 */
  let uploadedSubImageZoom = 100;

  let calendar = null;

  // =========================
  // 캘린더 드래그 / 리사이즈 중 클릭 오작동 방지
  // - 일정 길이 조절 직후 발생하는 click 이벤트가 상세창을 여는 것을 막습니다.
  // =========================

  let isCalendarEventInteractionActive = false;

  let lastCalendarEventInteractionAt = 0;

  function markCalendarEventInteractionStart() {
    isCalendarEventInteractionActive = true;
  }

  function markCalendarEventInteractionEnd() {
    lastCalendarEventInteractionAt = Date.now();

    setTimeout(() => {
      isCalendarEventInteractionActive = false;
    }, 120);
  }

  function isCalendarEventInteractionCoolingDown() {
    return (
      isCalendarEventInteractionActive ||
      Date.now() - lastCalendarEventInteractionAt < 180
    );
  }

  let allEvents = [];

  /* 원본 메인 이벤트 목록 */
  let allMainEvents = [];

  let currentSubEvents = [];

  /* 메인 이벤트 편집창에서 조절 중인 하위 이벤트 목록 */
  let currentMainSubEvents = [];

  let currentMainSubCalendarSubId = "";

  // =========================
  // 하위 이벤트 표시 순서 / 드래그 정렬
  // =========================

  let draggedSubEventId = "";

  let isSubEventDragging = false;

  function getSubEventOrderStorageKey(eventId) {
    return `subEventOrder:${eventId || "unknown"}`;
  }

  function readLocalSubEventOrder(eventId) {

    try {
      const savedOrder =
        localStorage.getItem(
          getSubEventOrderStorageKey(eventId)
        );

      return savedOrder
        ? JSON.parse(savedOrder)
        : [];

    } catch (error) {
      console.warn("하위 이벤트 로컬 순서 읽기 실패", error);
      return [];
    }

  }

  function writeLocalSubEventOrder(eventId, subEvents = []) {

    try {
      localStorage.setItem(
        getSubEventOrderStorageKey(eventId),
        JSON.stringify(
          subEvents
            .map(subEvent => subEvent.id)
            .filter(Boolean)
        )
      );
    } catch (error) {
      console.warn("하위 이벤트 로컬 순서 저장 실패", error);
    }

  }

  function sortSubEventsByDisplayOrder(subEvents = [], eventId = "") {

    const localOrder =
      readLocalSubEventOrder(eventId);

    const localOrderMap =
      new Map(
        localOrder.map((id, index) => [id, index])
      );

    return [...subEvents].sort((a, b) => {

      const aOrder =
        Number.isFinite(Number(a.display_order))
          ? Number(a.display_order)
          : localOrderMap.has(a.id)
            ? localOrderMap.get(a.id)
            : Number.POSITIVE_INFINITY;

      const bOrder =
        Number.isFinite(Number(b.display_order))
          ? Number(b.display_order)
          : localOrderMap.has(b.id)
            ? localOrderMap.get(b.id)
            : Number.POSITIVE_INFINITY;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      const startDiff =
        getDateTimeValue(a.start_date || "") -
        getDateTimeValue(b.start_date || "");

      if (startDiff !== 0) {
        return startDiff;
      }

      return String(a.id || "").localeCompare(String(b.id || ""));

    });

  }

  function applyCurrentSubEventOrderToCalendar() {

    if (!currentDetailEvent) return;

    const parentEventId =
      currentDetailEvent.id;

    allMainEvents =
      allMainEvents.map(event => {

        if (event.id !== parentEventId) {
          return event;
        }

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,
            subEvents: currentSubEvents,
          },
        };

      });

    if (typeof currentDetailEvent.setExtendedProp === "function") {
      currentDetailEvent.setExtendedProp(
        "subEvents",
        currentSubEvents
      );
    } else if (currentDetailEvent.extendedProps) {
      currentDetailEvent.extendedProps.subEvents =
        currentSubEvents;
    }

    applySearchFilter();

  }

  async function persistCurrentSubEventOrder() {

    if (!currentDetailEvent) return;

    const parentEventId =
      currentDetailEvent.id;

    currentSubEvents =
      currentSubEvents.map((subEvent, index) => ({
        ...subEvent,
        display_order: index,
      }));

    writeLocalSubEventOrder(
      parentEventId,
      currentSubEvents
    );

    applyCurrentSubEventOrderToCalendar();

    try {
      const updateResults =
        await Promise.all(
          currentSubEvents.map((subEvent, index) => {
            return supabaseClient
              .from("sub_events")
              .update({
                display_order: index,
              })
              .eq("id", subEvent.id);
          })
        );

      const firstError =
        updateResults.find(result => result.error)?.error;

      if (firstError) {
        console.warn(
          "하위 이벤트 DB 순서 저장 실패. display_order 컬럼이 없으면 로컬 순서만 적용됩니다.",
          firstError
        );
      }

    } catch (error) {
      console.warn(
        "하위 이벤트 DB 순서 저장 실패. 로컬 순서만 적용됩니다.",
        error
      );
    }

  }

  function getDragAfterSubEventCard(container, y) {

    const draggableCards =
      Array.from(
        container.querySelectorAll(
          ".sub-event-card[draggable='true']:not(.dragging)"
        )
      );

    return draggableCards.reduce((closest, child) => {

      const box =
        child.getBoundingClientRect();

      const offset =
        y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return {
          offset,
          element: child,
        };
      }

      return closest;

    }, {
      offset: Number.NEGATIVE_INFINITY,
      element: null,
    }).element;

  }

  function setupSubEventDragAndDrop() {

    if (!subEventList || subEventList.dataset.dragReady === "true") {
      return;
    }

    subEventList.dataset.dragReady =
      "true";

    subEventList.addEventListener(
      "dragstart",
      (e) => {

        if (!isAdmin) return;

        const card =
          e.target.closest(".sub-event-card");

        if (!card) return;

        draggedSubEventId =
          card.dataset.subEventId || "";

        isSubEventDragging = true;

        card.classList.add("dragging");
        subEventList.classList.add("drag-active");

        e.dataTransfer.effectAllowed =
          "move";

        e.dataTransfer.setData(
          "text/plain",
          draggedSubEventId
        );

      }
    );

    subEventList.addEventListener(
      "dragover",
      (e) => {

        if (!isAdmin || !draggedSubEventId) return;

        e.preventDefault();

        const draggingCard =
          subEventList.querySelector(".sub-event-card.dragging");

        if (!draggingCard) return;

        const afterElement =
          getDragAfterSubEventCard(
            subEventList,
            e.clientY
          );

        if (!afterElement) {
          subEventList.appendChild(draggingCard);
        } else {
          subEventList.insertBefore(
            draggingCard,
            afterElement
          );
        }

      }
    );

    subEventList.addEventListener(
      "drop",
      async (e) => {

        if (!isAdmin || !draggedSubEventId) return;

        e.preventDefault();

        const orderedIds =
          Array.from(
            subEventList.querySelectorAll(".sub-event-card")
          )
            .map(card => card.dataset.subEventId)
            .filter(Boolean);

        const previousSubEvents =
          Array.isArray(currentSubEvents)
            ? [...currentSubEvents]
            : [];

        const subEventMap =
          new Map(
            previousSubEvents
              .filter(subEvent => subEvent?.id)
              .map(subEvent => [subEvent.id, subEvent])
          );

        const orderedSubEvents =
          orderedIds
            .map(id => subEventMap.get(id))
            .filter(Boolean);

        const missingSubEvents =
          previousSubEvents
            .filter(subEvent => {
              return subEvent?.id && !orderedIds.includes(subEvent.id);
            });

        currentSubEvents =
          [
            ...orderedSubEvents,
            ...missingSubEvents,
          ];

        await persistCurrentSubEventOrder();

        showToast("하위 이벤트 순서 저장 완료");

      }
    );

    subEventList.addEventListener(
      "dragend",
      () => {

        draggedSubEventId =
          "";

        isSubEventDragging = false;

        subEventList
          .querySelectorAll(".sub-event-card.dragging")
          .forEach(card => {
            card.classList.remove("dragging");
          });

        subEventList.classList.remove("drag-active");

      }
    );

  }

  setupSubEventDragAndDrop();

  // =========================
  // 메인 이벤트 실시간 편집 상태
  // =========================

  let isEditingMainEvent = false;

  /* 메인 이벤트 원래 이미지 위치 / 확대값 백업 */
  let originalImagePosX = 50;
  let originalImagePosY = 50;
  let originalImageZoom = 100;

  /* 하위 이벤트 원래 이미지 위치 / 확대값 백업 */
  let originalSubImagePosX = 50;
  let originalSubImagePosY = 50;
  let originalSubImageZoom = 100;

  /* 실시간 텍스트 스타일 미리보기 원복용 백업 */
  let originalEventTextStyle = null;
  let originalSubTextStyle = null;



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
  // FullCalendar 날짜 보정
  // FullCalendar의 end는 화면에서 제외되는 날짜라서
  // DB 종료일은 하루 더해서 표시하고, 저장할 때는 다시 하루 뺌
  // =========================

  function parseLocalDate(dateText) {

    if (!dateText) return null;

    return new Date(`${dateText}T00:00:00`);

  }

  function addOneDay(dateText) {

    if (!dateText) return null;

    const date =
      parseLocalDate(dateText);

    date.setDate(
      date.getDate() + 1
    );

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1).padStart(2, "0");

    const day =
      String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

  }

  function subtractOneDay(dateText) {

    if (!dateText) return null;

    const date =
      parseLocalDate(dateText);

    date.setDate(
      date.getDate() - 1
    );

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1).padStart(2, "0");

    const day =
      String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

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
      editCalendarSettingsBtn?.classList.remove("hidden");

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
      editCalendarSettingsBtn?.classList.add("hidden");

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
  // 색상 + 투명도 rgba 변환
  // =========================

  function hexToRgba(hex, alpha) {

    const cleanHex =
      (hex || "#000000").replace("#", "");

    const r =
      parseInt(cleanHex.substring(0, 2), 16);

    const g =
      parseInt(cleanHex.substring(2, 4), 16);

    const b =
      parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;

  }




  // =========================
  // 텍스트 스타일 유틸
  // 텍스트가 비어있으면 배경도 표시하지 않음
  // =========================

  function getDefaultTextStyle() {

    // 모든 기본 텍스트 스타일은 상단 이미지 텍스트 기본 스타일을 기준으로 통일
    return {
      textColor:
        calendarSettings.hero_text_color
        || calendarSettings.default_text_color
        || "#ffffff",

      bgColor:
        calendarSettings.hero_text_bg_color
        || calendarSettings.default_text_bg_color
        || "#000000",

      bgAlpha:
        Number(
          calendarSettings.hero_text_bg_alpha
          ?? calendarSettings.default_text_bg_alpha
          ?? 0.35
        ),

      textSize:
        Number(
          calendarSettings.hero_text_size
          ?? calendarSettings.default_text_size
          ?? 13
        ),
    };

  }

  function getHeroTextStyle() {

    return {
      textColor:
        calendarSettings.hero_text_color
        || calendarSettings.default_text_color
        || "#ffffff",

      bgColor:
        calendarSettings.hero_text_bg_color
        || calendarSettings.default_text_bg_color
        || "#000000",

      bgAlpha:
        Number(
          calendarSettings.hero_text_bg_alpha
          ?? calendarSettings.default_text_bg_alpha
          ?? 0.35
        ),

      textSize:
        Number(
          calendarSettings.hero_text_size
          ?? calendarSettings.default_text_size
          ?? 13
        ),
    };

  }

  function makeTextStyleVars(style = {}) {

    const defaults =
      getDefaultTextStyle();

    const textColor =
      style.textColor || defaults.textColor;

    const bgColor =
      style.bgColor || defaults.bgColor;

    const bgAlpha =
      Number(style.bgAlpha ?? defaults.bgAlpha);

    const textSize =
      Number(style.textSize ?? defaults.textSize);

    return `--text-color: ${textColor}; --text-bg: ${hexToRgba(bgColor, bgAlpha)}; --text-size: ${textSize}px;`;

  }

  function textBoxHtml(className, text, style = {}) {

    const safeText =
      text || "";

    if (!safeText.trim()) {
      return "";
    }

    return `
      <span
        class="${className} text-style-box"
        style="${makeTextStyleVars(style)}"
      >
        ${safeText}
      </span>
    `;

  }

  function getEventTextStyleFromProps(props = {}) {

    return {
      textColor:
        props.textColor || props.text_color,

      bgColor:
        props.textBgColor || props.text_bg_color,

      bgAlpha:
        props.textBgAlpha ?? props.text_bg_alpha,

      textSize:
        props.textSize ?? props.text_size,
    };

  }

  function applyTextStyleInputs(prefix, style = {}) {

    const defaults =
      getDefaultTextStyle();

    const colorInput =
      prefix === "event" ? eventTextColor : subTextColor;

    const bgColorInput =
      prefix === "event" ? eventTextBgColor : subTextBgColor;

    const bgAlphaInput =
      prefix === "event" ? eventTextBgAlpha : subTextBgAlpha;

    const sizeInput =
      prefix === "event" ? eventTextSize : subTextSize;

    setValue(colorInput, style.textColor || defaults.textColor);
    setValue(bgColorInput, style.bgColor || defaults.bgColor);
    setValue(bgAlphaInput, Math.round(Number(style.bgAlpha ?? defaults.bgAlpha) * 100));
    setValue(sizeInput, Number(style.textSize ?? defaults.textSize));

  }

  function readTextStyleInputs(prefix) {

    const colorInput =
      prefix === "event" ? eventTextColor : subTextColor;

    const bgColorInput =
      prefix === "event" ? eventTextBgColor : subTextBgColor;

    const bgAlphaInput =
      prefix === "event" ? eventTextBgAlpha : subTextBgAlpha;

    const sizeInput =
      prefix === "event" ? eventTextSize : subTextSize;

    return {
      textColor:
        safeValue(colorInput, getDefaultTextStyle().textColor),

      bgColor:
        safeValue(bgColorInput, getDefaultTextStyle().bgColor),

      bgAlpha:
        Number(safeValue(bgAlphaInput, Math.round(getDefaultTextStyle().bgAlpha * 100))) / 100,

      textSize:
        Number(safeValue(sizeInput, getDefaultTextStyle().textSize)),
    };

  }


  // =========================
  // 텍스트 스타일 실시간 미리보기
  // =========================

  function normalizeHeroItems(items = []) {

    return (Array.isArray(items) ? items : [])
      .filter(item => item && (item.image || item.text))
      .slice(0, 5)
      .map(item => ({
        image:
          item.image || "",

        text:
          item.text || "",

        pos_x:
          item.pos_x ?? item.image_pos_x ?? 50,

        pos_y:
          item.pos_y ?? item.image_pos_y ?? 50,

        zoom:
          item.zoom ?? item.image_zoom ?? 100,

        text_color:
          item.text_color || "",

        text_bg_color:
          item.text_bg_color || "",

        text_bg_alpha:
          item.text_bg_alpha,

        text_size:
          item.text_size,
      }));

  }

  function getHeroItemStyle(item = {}) {

    const defaults =
      getHeroTextStyle();

    return {
      textColor:
        item.text_color || defaults.textColor,

      bgColor:
        item.text_bg_color || defaults.bgColor,

      bgAlpha:
        item.text_bg_alpha ?? defaults.bgAlpha,

      textSize:
        item.text_size ?? defaults.textSize,
    };

  }

  function syncHeroEditorFilesClear() {

    if (calendarHeroImageInput) {
      calendarHeroImageInput.value = "";
    }

  }

  function applyHeroCountClass(count) {

    if (!calendarHeroList) return;

    calendarHeroList.classList.remove(
      "hero-count-0",
      "hero-count-1",
      "hero-count-2",
      "hero-count-3",
      "hero-count-4",
      "hero-count-5"
    );

    const safeCount =
      Math.min(5, Math.max(0, Number(count) || 0));

    calendarHeroList.classList.add(
      `hero-count-${safeCount}`
    );

    calendarHeroList.style.setProperty(
      "--hero-count",
      String(Math.max(1, safeCount))
    );

  }

  function renderHeroSelect() {

    if (!calendarHeroSelect) return;

    calendarHeroSelect.innerHTML = "";

    if (editingHeroItems.length === 0) {

      const option =
        document.createElement("option");

      option.value = "-1";
      option.textContent = "상단 이미지 없음";

      calendarHeroSelect.appendChild(option);

      selectedHeroIndex = -1;

      return;

    }

    editingHeroItems.forEach((item, index) => {

      const option =
        document.createElement("option");

      option.value = String(index);
      option.textContent =
        `이미지 ${index + 1}${item.text ? ` - ${item.text}` : ""}`;

      calendarHeroSelect.appendChild(option);

    });

    if (
      selectedHeroIndex < 0 ||
      selectedHeroIndex >= editingHeroItems.length
    ) {
      selectedHeroIndex = 0;
    }

    calendarHeroSelect.value =
      String(selectedHeroIndex);

  }

  function renderHeroEditor() {

    renderHeroSelect();

    const item =
      editingHeroItems[selectedHeroIndex];

    if (!item) {

      hide(calendarHeroEditor);
      syncHeroEditorFilesClear();
      renderHeroEditorPreview();

      return;

    }

    show(calendarHeroEditor);

    const style =
      getHeroItemStyle(item);

    setValue(calendarHeroTextInput, item.text || "");
    setValue(calendarHeroPosX, item.pos_x ?? 50);
    setValue(calendarHeroPosY, item.pos_y ?? 50);
    setValue(calendarHeroZoom, item.zoom ?? 100);
    setValue(calendarHeroTextColor, style.textColor);
    setValue(calendarHeroTextBgColor, style.bgColor);
    setValue(calendarHeroTextBgAlpha, Math.round(Number(style.bgAlpha) * 100));
    setValue(calendarHeroTextSize, style.textSize);

    syncHeroEditorFilesClear();
    renderHeroEditorPreview();

  }

  function renderHeroEditorPreview() {

    if (!calendarHeroEditorPreview) return;

    const item =
      editingHeroItems[selectedHeroIndex];

    if (!item || !item.image) {

      calendarHeroEditorPreview.style.removeProperty("--hero-pos-x");
      calendarHeroEditorPreview.style.removeProperty("--hero-pos-y");
      calendarHeroEditorPreview.style.removeProperty("--hero-scale");

      calendarHeroEditorPreview.innerHTML =
        `<span class="hero-editor-empty">미리보기</span>`;

      return;

    }

    const posX =
      item.pos_x ?? 50;

    const posY =
      item.pos_y ?? 50;

    const zoom =
      item.zoom ?? 100;

    calendarHeroEditorPreview.style.setProperty(
      "--hero-pos-x",
      `${posX}%`
    );

    calendarHeroEditorPreview.style.setProperty(
      "--hero-pos-y",
      `${posY}%`
    );

    calendarHeroEditorPreview.style.setProperty(
      "--hero-scale",
      String(Number(zoom) / 100)
    );

    calendarHeroEditorPreview.innerHTML =
      `
        <img
          src="${item.image}"
          alt=""
          style="
            object-position: ${posX}% ${posY}%;
            transform: scale(${Number(zoom) / 100});
            transform-origin: ${posX}% ${posY}%;
          "
        />

        ${item.text?.trim()
          ? `
            <div
              class="calendar-hero-text text-style-box"
              style="${makeTextStyleVars(getHeroItemStyle(item))}"
            >
              ${item.text}
            </div>
          `
          : ""
        }
      `;

  }

  function updateSelectedHeroItemFromEditor() {

    const item =
      editingHeroItems[selectedHeroIndex];

    if (!item) return;

    item.text =
      safeValue(calendarHeroTextInput, "");

    item.pos_x =
      Number(safeValue(calendarHeroPosX, 50));

    item.pos_y =
      Number(safeValue(calendarHeroPosY, 50));

    item.zoom =
      Number(safeValue(calendarHeroZoom, 100));

    item.text_color =
      safeValue(calendarHeroTextColor, getHeroTextStyle().textColor);

    item.text_bg_color =
      safeValue(calendarHeroTextBgColor, getHeroTextStyle().bgColor);

    item.text_bg_alpha =
      Number(safeValue(calendarHeroTextBgAlpha, 35)) / 100;

    item.text_size =
      Number(safeValue(calendarHeroTextSize, getHeroTextStyle().textSize));

    renderHeroSelect();
    renderHeroEditorPreview();
    renderCalendarHeroPreview();

  }

  function updateSelectedHeroImagePreview() {

    const item =
      editingHeroItems[selectedHeroIndex];

    if (!item) return;

    const file =
      calendarHeroImageInput?.files[0];

    if (!file) return;

    item.localFile = file;
    item.image = URL.createObjectURL(file);

    renderHeroEditorPreview();
    renderCalendarHeroPreview();

  }

  function addHeroItem() {

    if (editingHeroItems.length >= 5) {
      alert("상단 이미지는 최대 5개까지 추가할 수 있습니다.");
      return;
    }

    const defaults =
      getHeroTextStyle();

    editingHeroItems.push({
      image: "",
      text: "",
      pos_x: 50,
      pos_y: 50,
      zoom: 100,
      text_color: defaults.textColor,
      text_bg_color: defaults.bgColor,
      text_bg_alpha: defaults.bgAlpha,
      text_size: defaults.textSize,
    });

    selectedHeroIndex =
      editingHeroItems.length - 1;

    renderHeroEditor();
    renderCalendarHeroPreview();

  }

  function deleteSelectedHeroItem() {

    if (selectedHeroIndex < 0) return;

    editingHeroItems.splice(selectedHeroIndex, 1);

    if (editingHeroItems.length === 0) {
      selectedHeroIndex = -1;
    } else if (selectedHeroIndex >= editingHeroItems.length) {
      selectedHeroIndex = editingHeroItems.length - 1;
    }

    renderHeroEditor();
    renderCalendarHeroPreview();

  }

  function updateCalendarSettingsPreview() {

    const previewTitle =
      safeValue(calendarTitleInput, "게임 이벤트 스케줄").trim()
      || "게임 이벤트 스케줄";

    if (calendarMainTitle) {
      calendarMainTitle.textContent =
        previewTitle;
    }

    const heroTextColor =
      safeValue(heroTextColorInput, "#ffffff");

    const heroBgColor =
      safeValue(heroTextBgColorInput, "#000000");

    const heroAlpha =
      Number(safeValue(heroTextBgAlphaInput, 35)) / 100;

    const heroTextSize =
      Number(safeValue(heroTextSizeInput, 13));

    document.documentElement.style.setProperty(
      "--default-text-color",
      heroTextColor
    );

    document.documentElement.style.setProperty(
      "--default-text-bg",
      hexToRgba(heroBgColor, heroAlpha)
    );

    document.documentElement.style.setProperty(
      "--default-text-size",
      `${heroTextSize}px`
    );

    setValue(defaultTextColorInput, heroTextColor);
    setValue(defaultTextBgColorInput, heroBgColor);
    setValue(defaultTextBgAlphaInput, Math.round(heroAlpha * 100));
    setValue(defaultTextSizeInput, heroTextSize);

    renderHeroEditorPreview();
    renderCalendarHeroPreview();

    applySearchFilter();

    if (currentDetailEvent) {
      openDetailModal(currentDetailEvent);
    }

  }

  function renderCalendarHeroPreview() {

    if (!calendarHeroList) return;

    calendarHeroList.innerHTML = "";

    const items =
      editingHeroItems
        .filter(item => item?.image)
        .slice(0, 5);

    applyHeroCountClass(items.length);

    items
      .forEach(item => {

        const heroItem =
          document.createElement("div");

        const posX =
          item.pos_x ?? 50;

        const posY =
          item.pos_y ?? 50;

        const zoom =
          item.zoom ?? 100;

        heroItem.className =
          "calendar-hero-item";


        heroItem.style.setProperty(
          "--hero-pos-x",
          `${posX}%`
        );

        heroItem.style.setProperty(
          "--hero-pos-y",
          `${posY}%`
        );

        heroItem.style.setProperty(
          "--hero-scale",
          String(Number(zoom) / 100)
        );

        heroItem.innerHTML =
          `
            <img
              src="${item.image}"
              alt=""
              style="
                object-position: ${posX}% ${posY}%;
                transform: scale(${Number(zoom) / 100});
                transform-origin: ${posX}% ${posY}%;
              "
            />

            ${item.text?.trim()
              ? `
                <div
                  class="calendar-hero-text text-style-box"
                  style="${makeTextStyleVars(getHeroItemStyle(item))}"
                >
                  ${item.text}
                </div>
              `
              : ""
            }
          `;

        calendarHeroList.appendChild(heroItem);

      });

  }

  function updateEventTextStylePreview() {

    if (!currentEvent) return;

    const style =
      readTextStyleInputs("event");

    allMainEvents =
      allMainEvents.map(event => {

        if (event.id !== currentEvent.id) {
          return event;
        }

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,

            textColor: style.textColor,
            textBgColor: style.bgColor,
            textBgAlpha: style.bgAlpha,
            textSize: style.textSize,
          },
        };

      });

    currentEvent.setExtendedProp(
      "textColor",
      style.textColor
    );

    currentEvent.setExtendedProp(
      "textBgColor",
      style.bgColor
    );

    currentEvent.setExtendedProp(
      "textBgAlpha",
      style.bgAlpha
    );

    currentEvent.setExtendedProp(
      "textSize",
      style.textSize
    );

    applySearchFilter();

  }

  function updateSubTextStylePreview() {

    if (!currentSubEvent) return;

    const style =
      readTextStyleInputs("sub");

    currentSubEvent = {
      ...currentSubEvent,
      text_color: style.textColor,
      text_bg_color: style.bgColor,
      text_bg_alpha: style.bgAlpha,
      text_size: style.textSize,
    };

    currentSubEvents =
      currentSubEvents.map(subEvent => {

        if (subEvent.id !== currentSubEvent.id) {
          return subEvent;
        }

        return {
          ...subEvent,
          text_color: style.textColor,
          text_bg_color: style.bgColor,
          text_bg_alpha: style.bgAlpha,
          text_size: style.textSize,
        };

      });

    renderSubEvents();

    allMainEvents =
      allMainEvents.map(event => {

        if (event.id !== currentDetailEvent?.id) {
          return event;
        }

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,
            subEvents: currentSubEvents,
          },
        };

      });

    applySearchFilter();

  }

  function restoreEventTextStylePreview() {

    if (!currentEvent || !originalEventTextStyle) return;

    allMainEvents =
      allMainEvents.map(event => {

        if (event.id !== currentEvent.id) {
          return event;
        }

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,

            textColor: originalEventTextStyle.textColor,
            textBgColor: originalEventTextStyle.bgColor,
            textBgAlpha: originalEventTextStyle.bgAlpha,
            textSize: originalEventTextStyle.textSize,
          },
        };

      });

    applySearchFilter();

    originalEventTextStyle = null;

  }

  function restoreSubTextStylePreview() {

    if (!currentSubEvent || !originalSubTextStyle) return;

    currentSubEvents =
      currentSubEvents.map(subEvent => {

        if (subEvent.id !== currentSubEvent.id) {
          return subEvent;
        }

        return {
          ...subEvent,
          text_color: originalSubTextStyle.textColor,
          text_bg_color: originalSubTextStyle.bgColor,
          text_bg_alpha: originalSubTextStyle.bgAlpha,
          text_size: originalSubTextStyle.textSize,
        };

      });

    renderSubEvents();

    allMainEvents =
      allMainEvents.map(event => {

        if (event.id !== currentDetailEvent?.id) {
          return event;
        }

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,
            subEvents: currentSubEvents,
          },
        };

      });

    applySearchFilter();

    originalSubTextStyle = null;

  }

  // =========================
  // 캘린더 설정 불러오기
  // =========================

  async function loadCalendarSettings() {

    const { data, error } =
      await supabaseClient
        .from("calendar_settings")
        .select("*")
        .eq("id", "main")
        .maybeSingle();

    if (error) {

      console.error(error);

      return;

    }

    if (data) {

      calendarSettings = {
        ...calendarSettings,
        ...data,
        banner_items:
          Array.isArray(data.banner_items)
            ? data.banner_items
            : [],
      };

    }

    applyCalendarSettings();

  }



  // =========================
  // 캘린더 설정 화면 반영
  // =========================

  function applyCalendarSettings() {

    const title =
      calendarSettings.title || "게임 이벤트 스케줄";

    if (calendarMainTitle) {
      calendarMainTitle.textContent =
        title;
    }

    if (calendarTitleInput) {
      calendarTitleInput.value =
        title;
    }

    const heroStyle =
      getHeroTextStyle();

    document.documentElement.style.setProperty(
      "--default-text-color",
      heroStyle.textColor
    );

    document.documentElement.style.setProperty(
      "--default-text-bg",
      hexToRgba(heroStyle.bgColor, heroStyle.bgAlpha)
    );

    document.documentElement.style.setProperty(
      "--default-text-size",
      `${heroStyle.textSize}px`
    );

    setValue(defaultTextColorInput, heroStyle.textColor);
    setValue(defaultTextBgColorInput, heroStyle.bgColor);
    setValue(defaultTextBgAlphaInput, Math.round(heroStyle.bgAlpha * 100));
    setValue(defaultTextSizeInput, heroStyle.textSize);

    setValue(heroTextColorInput, heroStyle.textColor);
    setValue(heroTextBgColorInput, heroStyle.bgColor);
    setValue(heroTextBgAlphaInput, Math.round(heroStyle.bgAlpha * 100));
    setValue(heroTextSizeInput, heroStyle.textSize);

    editingHeroItems =
      normalizeHeroItems(calendarSettings.banner_items || []);

    selectedHeroIndex =
      editingHeroItems.length > 0 ? 0 : -1;

    renderHeroEditor();
    renderCalendarHeroList();

  }



  // =========================
  // 캘린더 상단 이미지 렌더링
  // =========================

  function renderCalendarHeroList() {

    if (!calendarHeroList) return;

    const items =
      normalizeHeroItems(calendarSettings.banner_items || [])
        .filter(item => item?.image)
        .slice(0, 5);

    calendarHeroList.innerHTML = "";

    applyHeroCountClass(items.length);

    items.forEach(item => {

      const heroItem =
        document.createElement("div");

      const posX =
        item.pos_x ?? 50;

      const posY =
        item.pos_y ?? 50;

      const zoom =
        item.zoom ?? 100;

      heroItem.className =
        "calendar-hero-item";


        heroItem.style.setProperty(
          "--hero-pos-x",
          `${posX}%`
        );

        heroItem.style.setProperty(
          "--hero-pos-y",
          `${posY}%`
        );

        heroItem.style.setProperty(
          "--hero-scale",
          String(Number(zoom) / 100)
        );

      heroItem.innerHTML =
        `
          <img
            src="${item.image}"
            alt=""
            style="
              object-position: ${posX}% ${posY}%;
              transform: scale(${Number(zoom) / 100});
              transform-origin: ${posX}% ${posY}%;
            "
          />

          ${item.text?.trim()
            ? `
              <div
                class="calendar-hero-text text-style-box"
                style="${makeTextStyleVars(getHeroItemStyle(item))}"
              >
                ${item.text}
              </div>
            `
            : ""
          }
        `;

      calendarHeroList.appendChild(heroItem);

    });

  }



  // =========================
  // 캘린더 설정 저장
  // =========================

  async function saveCalendarSettings() {

    if (!isAdmin) return;

    updateSelectedHeroItemFromEditor();

    const nextItems = [];

    for (const item of editingHeroItems.slice(0, 5)) {

      let image =
        item.image || "";

      if (item.localFile) {

        const uploadedUrl =
          await uploadImageToSupabase(item.localFile);

        if (!uploadedUrl) return;

        image =
          uploadedUrl;

      }

      if (image || (item.text || "").trim()) {

        nextItems.push({
          image,
          text:
            item.text || "",
          pos_x:
            item.pos_x ?? 50,
          pos_y:
            item.pos_y ?? 50,
          zoom:
            item.zoom ?? 100,
          text_color:
            item.text_color || safeValue(heroTextColorInput, "#ffffff"),
          text_bg_color:
            item.text_bg_color || safeValue(heroTextBgColorInput, "#000000"),
          text_bg_alpha:
            item.text_bg_alpha ?? Number(safeValue(heroTextBgAlphaInput, 35)) / 100,
          text_size:
            item.text_size ?? Number(safeValue(heroTextSizeInput, 13)),
        });

      }

    }

    const nextSettings = {
      id: "main",

      title:
        safeValue(calendarTitleInput, "게임 이벤트 스케줄").trim()
        || "게임 이벤트 스케줄",

      banner_items:
        nextItems,

      default_text_color:
        safeValue(heroTextColorInput, "#ffffff"),

      default_text_bg_color:
        safeValue(heroTextBgColorInput, "#000000"),

      default_text_bg_alpha:
        Number(safeValue(heroTextBgAlphaInput, 35)) / 100,

      default_text_size:
        Number(safeValue(heroTextSizeInput, 13)),

      hero_text_color:
        safeValue(heroTextColorInput, "#ffffff"),

      hero_text_bg_color:
        safeValue(heroTextBgColorInput, "#000000"),

      hero_text_bg_alpha:
        Number(safeValue(heroTextBgAlphaInput, 35)) / 100,

      hero_text_size:
        Number(safeValue(heroTextSizeInput, 13)),

      updated_at:
        new Date().toISOString(),
    };

    const { error } =
      await supabaseClient
        .from("calendar_settings")
        .upsert(nextSettings, {
          onConflict: "id",
        });

    if (error) {

      console.error(error);

      alert("캘린더 설정 저장 실패");

      return;

    }

    calendarSettings =
      nextSettings;

    editingHeroItems =
      normalizeHeroItems(nextItems);

    selectedHeroIndex =
      editingHeroItems.length > 0 ? 0 : -1;

    applyCalendarSettings();

    hide(calendarSettingsModal);

    showToast("캘린더 설정 저장 완료");

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

      end: addOneDay(item.end_date),

      extendedProps: {
        image: item.image_url || "",
        color: item.color || "#1f2937",

        // 이미지 위치
        imagePosX: item.image_pos_x ?? 50,
        imagePosY: item.image_pos_y ?? 50,
        imageZoom: item.image_zoom ?? 100,

        category: item.category || CATEGORY_DEFAULT,
        description: item.description || "",
        textColor: item.text_color || "",
        textBgColor: item.text_bg_color || "",
        textBgAlpha: item.text_bg_alpha,
        textSize: item.text_size,
        rawEnd: item.end_date || "",
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

          image_zoom:
            eventData.extendedProps.imageZoom ?? 100,

          text_color:
            eventData.extendedProps.textColor || null,

          text_bg_color:
            eventData.extendedProps.textBgColor || null,

          text_bg_alpha:
            eventData.extendedProps.textBgAlpha ?? null,

          text_size:
            eventData.extendedProps.textSize ?? null,

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

          image_zoom:
            eventData.extendedProps.imageZoom ?? 100,

          text_color:
            eventData.extendedProps.textColor || null,

          text_bg_color:
            eventData.extendedProps.textBgColor || null,

          text_bg_alpha:
            eventData.extendedProps.textBgAlpha ?? null,

          text_size:
            eventData.extendedProps.textSize ?? null,

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

    return sortSubEventsByDisplayOrder(
      data || [],
      eventId
    );

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

          image_zoom:
            subData.image_zoom ?? 100,

          // 메인 이벤트 배너 안 하위 이벤트 이미지 위치 저장
          calendar_image_pos_x:
            subData.calendar_image_pos_x ?? 50,

          calendar_image_pos_y:
            subData.calendar_image_pos_y ?? 50,

          calendar_image_zoom:
            subData.calendar_image_zoom ?? 100,

          text_color:
            subData.text_color || null,

          text_bg_color:
            subData.text_bg_color || null,

          text_bg_alpha:
            subData.text_bg_alpha ?? null,

          text_size:
            subData.text_size ?? null,

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

    setValue(
      endInput,
      event.extendedProps.rawEnd || subtractOneDay(event.endStr) || ""
    );

    setValue(
      categoryInput,
      event.extendedProps.category || CATEGORY_DEFAULT
    );

    setValue(
      descriptionInput,
      event.extendedProps.description || ""
    );

    originalEventTextStyle =
      getEventTextStyleFromProps(event.extendedProps);

    applyTextStyleInputs(
      "event",
      originalEventTextStyle
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

    uploadedImageZoom =
      event.extendedProps.imageZoom ?? 100;

    /* 메인 이벤트 원래 이미지 위치 / 확대값 백업 */
    originalImagePosX =
      uploadedImagePosX;

    originalImagePosY =
      uploadedImagePosY;

    originalImageZoom =
      uploadedImageZoom;

    /* 메인 이벤트 편집 상태 ON */
    isEditingMainEvent = true;

    // 슬라이더 UI 반영
    setValue(
      eventImagePosX,
      uploadedImagePosX
    );

    setValue(
      eventImagePosY,
      uploadedImagePosY
    );

    setValue(
      eventImageZoom,
      uploadedImageZoom
    );

    if (imageInput) {
      imageInput.value = "";
    }

    setupMainSubCalendarEditor(
      event.extendedProps.subEvents || []
    );

    show(eventModal);

  }



  // =========================
  // 새 메인 이벤트 편집창 열기
  // =========================

  function openModalForNewEvent(startDate = "") {

    currentEvent =
      null;

    isEditingMainEvent = false;

    setValue(titleInput, "");

    setValue(startInput, startDate);

    setValue(endInput, "");

    setValue(categoryInput, CATEGORY_DEFAULT);

    setValue(descriptionInput, "");

    originalEventTextStyle = null;

    applyTextStyleInputs("event", {});

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
    uploadedImageZoom = 100;

    // 메인 이미지 위치 / 확대 슬라이더 초기화
    setValue(eventImagePosX, 50);
    setValue(eventImagePosY, 50);
    setValue(eventImageZoom, 100);

    if (imageInput) {
      imageInput.value = "";
    }

    setupMainSubCalendarEditor([]);

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
  // 페이지 스크롤 위치 보존 유틸
  // =========================

  function runWithPageScrollRestored(callback) {

    const scrollX =
      window.scrollX || window.pageXOffset || 0;

    const scrollY =
      window.scrollY || window.pageYOffset || 0;

    const activeElement =
      document.activeElement;

    callback();

    // 캘린더 재렌더링 후 브라우저가 포커스를 맞추며
    // 페이지를 최상단으로 올리는 현상을 막기 위해 스크롤을 복구합니다.
    requestAnimationFrame(() => {

      try {
        activeElement?.focus?.({ preventScroll: true });
      } catch (error) {
        // 일부 브라우저는 preventScroll 옵션을 지원하지 않을 수 있습니다.
      }

      window.scrollTo(scrollX, scrollY);

      requestAnimationFrame(() => {
        window.scrollTo(scrollX, scrollY);
      });

    });

  }



  // =========================
  // 검색 적용
  // =========================

  function applySearchFilter() {

    if (!calendar) return;

    const keyword =
      safeValue(searchInput).trim().toLowerCase();

    const filteredMainEvents =
      allMainEvents.filter(event => {

        const subEvents =
          event.extendedProps.subEvents || [];

        const matchedMainTitle =
          event.title
            .toLowerCase()
            .includes(keyword);

        const matchedSubTitle =
          subEvents.some(subEvent => {
            return (subEvent.title || "")
              .toLowerCase()
              .includes(keyword);
          });

        return matchedMainTitle || matchedSubTitle;

      });

    allEvents =
      createCalendarEvents(filteredMainEvents);

    calendar.removeAllEvents();

    allEvents.forEach(event => {

      calendar.addEvent(event);

    });

  }



  // =========================
  // 카테고리 뱃지 HTML
  // =========================

  function getCategoryBadge(category) {

    const safeCategory =
      category || CATEGORY_DEFAULT;

    const categoryClassMap = {
      "업데이트": "category-update",
      "픽업": "category-pickup",
      "복각": "category-rerun",
      "공방": "category-workshop",
    };

    const categoryClass =
      categoryClassMap[safeCategory] || "category-update";

    return `
    <span class="category-badge ${categoryClass}">
      ${safeCategory}
    </span>
  `;

  }





  // =========================
  // 캘린더 표시용 이벤트 생성
  // DB의 메인/하위 이벤트는 그대로 두고 화면 표시만 분리
  // =========================

  function getDateTimeValue(dateText) {

    const date =
      parseLocalDate(dateText);

    return date
      ? date.getTime()
      : 0;

  }

  function getSubEventStartDate(subEvent, fallbackStart) {

    return subEvent.start_date || fallbackStart || "";

  }

  function getSubEventEndDate(subEvent) {

    return subEvent.end_date || subEvent.start_date || "";

  }

  function getInclusiveDateDuration(startDate, endDate) {

    const start =
      parseLocalDate(startDate);

    const end =
      parseLocalDate(endDate || startDate);

    if (!start || !end) {
      return 1;
    }

    const oneDay =
      24 * 60 * 60 * 1000;

    return Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / oneDay) + 1
    );

  }



  // =========================
  // 캘린더 배너 이미지 고정 규칙
  // 1~2일: 이미지 100%, 대표색/그라데이션 제거
  // 3일 이상: 이미지는 항상 2일 칸 폭, 블렌딩은 2일~3일 사이 고정
  // =========================

  function getCalendarDayCellWidthFromElement(eventElement) {

    const row =
      eventElement?.closest(".fc-daygrid-body tr") ||
      eventElement?.closest(".fc-scrollgrid-sync-table tr") ||
      eventElement?.closest("tr");

    const dayCell =
      row?.querySelector(".fc-daygrid-day[data-date]");

    const dayCellWidth =
      dayCell?.getBoundingClientRect().width;

    return dayCellWidth && dayCellWidth > 0
      ? dayCellWidth
      : 0;

  }

  function applyFixedDayImageRuleToBanner(
    bannerElement,
    durationDays,
    dayCellWidth = 0
  ) {

    if (!bannerElement) return;

    const safeDuration =
      Math.max(1, Number(durationDays) || 1);

    bannerElement.classList.remove(
      "calendar-banner-image-only",
      "calendar-banner-fixed-3plus"
    );

    if (safeDuration <= 2) {

      bannerElement.classList.add(
        "calendar-banner-image-only"
      );

      bannerElement.style.setProperty(
        "--banner-image-px",
        "100%"
      );

      bannerElement.style.setProperty(
        "--banner-blend-px",
        "0px"
      );

      return;

    }

    const fallbackWidth =
      bannerElement.getBoundingClientRect().width / safeDuration;

    const oneDayWidth =
      dayCellWidth || fallbackWidth || 0;

    const imageWidth =
      Math.max(1, oneDayWidth * 2);

    const blendWidth =
      Math.max(1, oneDayWidth);

    bannerElement.classList.add(
      "calendar-banner-fixed-3plus"
    );

    bannerElement.style.setProperty(
      "--banner-image-px",
      `${imageWidth}px`
    );

    bannerElement.style.setProperty(
      "--banner-blend-px",
      `${blendWidth}px`
    );

  }


  function rangesOverlapInclusive(aStart, aEnd, bStart, bEnd) {

    const aStartTime =
      getDateTimeValue(aStart);

    const aEndTime =
      getDateTimeValue(aEnd || aStart);

    const bStartTime =
      getDateTimeValue(bStart);

    const bEndTime =
      getDateTimeValue(bEnd || bStart);

    return aStartTime <= bEndTime && bStartTime <= aEndTime;

  }

  function buildSubEventLayoutMeta(subEvents = [], fallbackStart = "") {

    const validSubEvents =
      subEvents
        .filter(subEvent => subEvent?.start_date || subEvent?.end_date)
        .map((subEvent, originalIndex) => {

          const start =
            getSubEventStartDate(subEvent, fallbackStart);

          const end =
            getSubEventEndDate(subEvent);

          return {
            subEvent,
            originalIndex,
            start,
            end,
          };

        })
        .sort((a, b) => {

          const startDiff =
            getDateTimeValue(a.start) - getDateTimeValue(b.start);

          if (startDiff !== 0) {
            return startDiff;
          }

          return a.originalIndex - b.originalIndex;

        });

    const metaById =
      new Map();

    validSubEvents.forEach((item, sortedIndex) => {

      const previousOverlaps =
        validSubEvents
          .slice(0, sortedIndex)
          .filter(previous => {

            return rangesOverlapInclusive(
              item.start,
              item.end,
              previous.start,
              previous.end
            );

          });

      const hasEarlierStartOverlap =
        previousOverlaps.some(previous => {
          return getDateTimeValue(previous.start) < getDateTimeValue(item.start);
        });

      metaById.set(
        item.subEvent.id,
        {
          overlapsEarlier: previousOverlaps.length > 0,
          shiftHalfDay: hasEarlierStartOverlap,
          overlapLevel: previousOverlaps.length,
          durationDays: getInclusiveDateDuration(item.start, item.end),
        }
      );

    });

    return metaById;

  }

  function createCalendarEvents(mainEvents) {

    const displayEvents = [];

    mainEvents.forEach(mainEvent => {

      displayEvents.push({
        ...mainEvent,

        end:
          addOneDay(
            mainEvent.extendedProps?.rawEnd || mainEvent.end
          ),

        extendedProps: {
          ...mainEvent.extendedProps,

          rawEnd:
            mainEvent.extendedProps?.rawEnd || mainEvent.end || "",
        },
      });

    });

    return displayEvents;

  }

  function clampPercent(value) {

    return Math.min(
      100,
      Math.max(0, Number(value) || 0)
    );

  }

  function getDayOffset(startDate, targetDate) {

    const start =
      parseLocalDate(startDate);

    const target =
      parseLocalDate(targetDate);

    if (!start || !target) {
      return 0;
    }

    const oneDay =
      24 * 60 * 60 * 1000;

    return Math.round(
      (target.getTime() - start.getTime()) / oneDay
    );

  }


  function formatDateForData(dateText) {

    return dateText || "";

  }

  function getDateStringFromTime(timeValue) {

    const date =
      new Date(timeValue);

    const year =
      date.getFullYear();

    const month =
      String(date.getMonth() + 1).padStart(2, "0");

    const day =
      String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

  }

  function getRowDateRangeFromEventElement(eventElement) {

    const row =
      eventElement?.closest(".fc-daygrid-body tr") ||
      eventElement?.closest(".fc-scrollgrid-sync-table tr") ||
      eventElement?.closest("tr");

    if (!row) return null;

    const dayCells =
      Array.from(
        row.querySelectorAll(".fc-daygrid-day[data-date]")
      );

    if (dayCells.length === 0) return null;

    const dates =
      dayCells
        .map(cell => cell.getAttribute("data-date"))
        .filter(Boolean)
        .sort();

    if (dates.length === 0) return null;

    return {
      start: dates[0],
      end: dates[dates.length - 1],
    };

  }

  function maxDateText(a, b) {

    if (!a) return b || "";
    if (!b) return a || "";

    return getDateTimeValue(a) >= getDateTimeValue(b) ? a : b;

  }

  function minDateText(a, b) {

    if (!a) return b || "";
    if (!b) return a || "";

    return getDateTimeValue(a) <= getDateTimeValue(b) ? a : b;

  }

  function syncContainedSubEventsToSegment(info) {

    const eventElement =
      info?.el;

    const gameEvent =
      eventElement?.querySelector(".game-event");

    const layer =
      gameEvent?.querySelector(".calendar-sub-contained-layer");

    if (!gameEvent || !layer) return;

    const rowRange =
      getRowDateRangeFromEventElement(eventElement);

    const mainStart =
      info.event.startStr || "";

    const mainEnd =
      info.event.extendedProps.rawEnd ||
      subtractOneDay(info.event.endStr) ||
      mainStart;

    const segmentStart =
      maxDateText(mainStart, rowRange?.start || mainStart);

    const segmentEnd =
      minDateText(mainEnd, rowRange?.end || mainEnd);

    const segmentDurationDays =
      Math.max(
        1,
        getInclusiveDateDuration(segmentStart, segmentEnd)
      );

    const subElements =
      Array.from(
        layer.querySelectorAll(".calendar-sub-event-contained")
      );

    // 모든 하위 배너는 먼저 숨김 처리한 뒤,
    // 상세창 드래그 순서 기준 표시 후보만 다시 표시합니다.
    subElements.forEach(element => {
      element.classList.add("calendar-sub-hidden-in-segment");
    });

    const sortedByPriority =
      [...subElements].sort((a, b) => {

        const orderDiff =
          Number(a.dataset.subDisplayOrder || a.dataset.subOriginalIndex || 0) -
          Number(b.dataset.subDisplayOrder || b.dataset.subOriginalIndex || 0);

        if (orderDiff !== 0) return orderDiff;

        const startDiff =
          getDateTimeValue(a.dataset.subStart) -
          getDateTimeValue(b.dataset.subStart);

        if (startDiff !== 0) return startDiff;

        return Number(a.dataset.subOriginalIndex || 0) -
          Number(b.dataset.subOriginalIndex || 0);

      });

    // 핵심 규칙:
    // 각 주/월 조각마다 다시 2개를 뽑지 않고,
    // 전체 상세창 드래그 우선순위 상위 2개만 메인 배너 표시 후보로 고정합니다.
    const priorityDisplayIds =
      new Set(
        sortedByPriority
          .slice(0, 2)
          .map(element => element.dataset.subEventId)
          .filter(Boolean)
      );

    const segmentSubElements =
      sortedByPriority.filter(element => {

        const subStart =
          element.dataset.subStart || segmentStart;

        const subEnd =
          element.dataset.subEnd || subStart;

        return rangesOverlapInclusive(
          segmentStart,
          segmentEnd,
          subStart,
          subEnd
        );

      });

    const usedSameDateKeys =
      new Set();

    let displayedCount = 0;

    segmentSubElements.forEach(element => {

      const subId =
        element.dataset.subEventId || "";

      const subStart =
        element.dataset.subStart || segmentStart;

      const subEnd =
        element.dataset.subEnd || subStart;

      const sameDateKey =
        `${subStart}__${subEnd}`;

      // 동일한 시작일/종료일의 하위 이벤트는 캘린더에서 완전히 겹치므로
      // 가장 우선순위가 높은 1개만 보여주고 나머지는 +숫자 뱃지로 알립니다.
      if (usedSameDateKeys.has(sameDateKey)) {
        return;
      }

      // 후순위 하위 이벤트가 다른 주/월 조각에서 대신 올라오지 않도록
      // 상세창 드래그 순서 상위 2개만 표시를 허용합니다.
      if (!priorityDisplayIds.has(subId)) {
        return;
      }

      const visibleStart =
        maxDateText(segmentStart, subStart);

      const visibleEnd =
        minDateText(segmentEnd, subEnd);

      const shouldShiftHalfDay =
        element.dataset.subShiftHalfDay === "1" &&
        getDateTimeValue(subStart) >= getDateTimeValue(segmentStart);

      const halfDayOffset =
        shouldShiftHalfDay ? 0.5 : 0;

      const leftPercent =
        clampPercent(
          ((getDayOffset(segmentStart, visibleStart) + halfDayOffset) /
            segmentDurationDays) * 100
        );

      const widthDays =
        Math.max(
          0.5,
          getInclusiveDateDuration(visibleStart, visibleEnd) - halfDayOffset
        );

      const widthPercent =
        Math.min(
          Math.max(6, 100 - leftPercent),
          Math.max(8, (widthDays / segmentDurationDays) * 100)
        );

      element.style.setProperty("--sub-left", `${leftPercent}%`);
      element.style.setProperty("--sub-width", `${widthPercent}%`);

      const originalSubDurationDays =
        Math.max(
          1,
          getInclusiveDateDuration(subStart, subEnd)
        );

      applyFixedDayImageRuleToBanner(
        element,
        originalSubDurationDays,
        getCalendarDayCellWidthFromElement(eventElement)
      );

      element.classList.remove("calendar-sub-hidden-in-segment");

      usedSameDateKeys.add(sameDateKey);
      displayedCount += 1;

    });

    const moreBadge =
      layer.querySelector(".calendar-sub-more-badge");

    if (moreBadge) {

      // 뱃지는 단순히 3개 이상일 때가 아니라,
      // 현재 캘린더 조각 날짜에 존재하는 하위 이벤트 수가 실제 표시 수보다 많으면 표시합니다.
      // 따라서 동일 날짜 하위 이벤트가 2개뿐이어도 1개가 겹쳐 숨으면 +1이 표시됩니다.
      const hiddenSegmentCount =
        Math.max(0, segmentSubElements.length - displayedCount);

      if (hiddenSegmentCount > 0) {
        moreBadge.textContent = `+${hiddenSegmentCount}`;
        moreBadge.title = `추가 하위 이벤트 ${hiddenSegmentCount}개`;
        moreBadge.classList.remove("hidden");
      } else {
        moreBadge.textContent = "";
        moreBadge.title = "";
        moreBadge.classList.add("hidden");
      }

    }

  }

  function buildContainedSubEventsHtml(mainEventLike) {

    const props =
      mainEventLike.extendedProps || {};

    const subEvents =
      sortSubEventsByDisplayOrder(
        props.subEvents || [],
        mainEventLike.id || ""
      );

    if (!Array.isArray(subEvents) || subEvents.length === 0) {
      return "";
    }

    const mainStart =
      mainEventLike.startStr || mainEventLike.start || "";

    const mainEnd =
      props.rawEnd || mainEventLike.endStr || mainEventLike.end || mainStart;

    const mainDurationDays =
      Math.max(
        1,
        getInclusiveDateDuration(mainStart, mainEnd)
      );

    const subLayoutMeta =
      buildSubEventLayoutMeta(
        subEvents,
        mainStart
      );

    const validSubEvents =
      subEvents
        .filter(subEvent => subEvent?.start_date || subEvent?.end_date);

    const subItemsHtml =
      validSubEvents
        .map((subEvent, originalIndex) => {

          const subStart =
            getSubEventStartDate(subEvent, mainStart);

          const subEnd =
            getSubEventEndDate(subEvent) || subStart;

          const layoutMeta =
            subLayoutMeta.get(subEvent.id) || {
              overlapsEarlier: false,
              shiftHalfDay: false,
              overlapLevel: 0,
              durationDays: getInclusiveDateDuration(subStart, subEnd),
            };

          const startOffsetDays =
            getDayOffset(mainStart, subStart);

          const halfDayOffset =
            layoutMeta.shiftHalfDay ? 0.5 : 0;

          const leftPercent =
            clampPercent(
              ((startOffsetDays + halfDayOffset) / mainDurationDays) * 100
            );

          const widthDays =
            Math.max(
              0.5,
              Number(layoutMeta.durationDays || 1) - halfDayOffset
            );

          const maxWidthPercent =
            Math.max(
              6,
              100 - leftPercent
            );

          const widthPercent =
            Math.min(
              maxWidthPercent,
              Math.max(
                8,
                (widthDays / mainDurationDays) * 100
              )
            );

          const subColor =
            subEvent.color || "#1f2937";

          const subImage =
            subEvent.image_url || "";

          const subImagePosX =
            subEvent.calendar_image_pos_x ??
            subEvent.image_pos_x ??
            50;

          const subImagePosY =
            subEvent.calendar_image_pos_y ??
            subEvent.image_pos_y ??
            50;

          const subImageZoom =
            subEvent.calendar_image_zoom ??
            subEvent.image_zoom ??
            100;

          const subImageHtml =
            subImage
              ? `
                <div class="calendar-sub-image-zone">
                  <img
                    src="${subImage}"
                    style="
                      object-position: ${subImagePosX}% ${subImagePosY}%;
                      transform: scale(${Number(subImageZoom) / 100});
                      transform-origin: ${subImagePosX}% ${subImagePosY}%;
                    "
                  />
                </div>
              `
              : `<div class="calendar-sub-no-image"></div>`;

          const classes =
            [
              "calendar-sub-event",
              "calendar-sub-event-contained",
              layoutMeta.shiftHalfDay ? "sub-overlap-shift" : "",
              layoutMeta.overlapsEarlier ? "sub-overlap-raised" : "",
            ]
              .filter(Boolean)
              .join(" ");

          return `
            <div
              class="${classes}"
              data-sub-event-id="${subEvent.id || ""}"
              data-parent-event-id="${mainEventLike.id || ""}"
              data-sub-start="${formatDateForData(subStart)}"
              data-sub-end="${formatDateForData(subEnd)}"
              data-sub-original-index="${originalIndex}"
              data-sub-display-order="${Number.isFinite(Number(subEvent.display_order)) ? Number(subEvent.display_order) : originalIndex}"
              data-sub-shift-half-day="${layoutMeta.shiftHalfDay ? "1" : "0"}"
              data-sub-overlap-level="${layoutMeta.overlapLevel || 0}"
              style="
                --event-color: ${subColor};
                --sub-left: ${leftPercent}%;
                --sub-width: ${widthPercent}%;
                --sub-z: ${30 + Number(layoutMeta.overlapLevel || 0)};
              "
            >
              ${subImageHtml}

              <div class="calendar-sub-overlay">
                ${textBoxHtml(
                  "calendar-sub-title",
                  subEvent.title || "",
                  {
                    textColor: subEvent.text_color,
                    bgColor: subEvent.text_bg_color,
                    bgAlpha: subEvent.text_bg_alpha,
                    textSize: subEvent.text_size,
                  }
                )}
              </div>
            </div>
          `;

        })
        .join("");

    if (!subItemsHtml.trim()) {
      return "";
    }

    const moreBadgeHtml =
      `
        <div
          class="calendar-sub-more-badge hidden"
        ></div>
      `;

    return `
      <div class="calendar-sub-contained-layer">
        ${subItemsHtml}
        ${moreBadgeHtml}
      </div>
    `;

  }



  // =========================
  // 메인 이벤트 편집창 하위 배너 선택 UI 구성
  // =========================

  function setupMainSubCalendarEditor(subEvents = []) {

    currentMainSubEvents =
      sortSubEventsByDisplayOrder(
        subEvents,
        currentEvent?.id || currentDetailEvent?.id || ""
      ).map(subEvent => ({ ...subEvent }));

    currentMainSubCalendarSubId =
      currentMainSubEvents[0]?.id || "";

    if (!mainSubCalendarSelect) return;

    mainSubCalendarSelect.innerHTML = "";

    if (currentMainSubEvents.length === 0) {

      mainSubCalendarSelect.innerHTML =
        `<option value="">하위 이벤트 없음</option>`;

      setValue(mainSubCalendarImagePosX, 50);
      setValue(mainSubCalendarImagePosY, 50);
      setValue(mainSubCalendarImageZoom, 100);

      if (mainSubCalendarImagePosX) mainSubCalendarImagePosX.disabled = true;
      if (mainSubCalendarImagePosY) mainSubCalendarImagePosY.disabled = true;
      if (mainSubCalendarImageZoom) mainSubCalendarImageZoom.disabled = true;

      return;

    }

    if (mainSubCalendarImagePosX) mainSubCalendarImagePosX.disabled = false;
    if (mainSubCalendarImagePosY) mainSubCalendarImagePosY.disabled = false;
    if (mainSubCalendarImageZoom) mainSubCalendarImageZoom.disabled = false;

    currentMainSubEvents.forEach(subEvent => {

      const option =
        document.createElement("option");

      option.value =
        subEvent.id;

      option.textContent =
        subEvent.title || "하위 이벤트";

      mainSubCalendarSelect.appendChild(option);

    });

    setValue(
      mainSubCalendarSelect,
      currentMainSubCalendarSubId
    );

    applySelectedMainSubCalendarValues();

  }



  // =========================
  // 선택한 하위 이벤트의 캘린더 배너 이미지값을 UI에 반영
  // =========================

  function applySelectedMainSubCalendarValues() {

    const selectedSubEvent =
      currentMainSubEvents.find(subEvent => {
        return subEvent.id === currentMainSubCalendarSubId;
      });

    if (!selectedSubEvent) {

      setValue(mainSubCalendarImagePosX, 50);
      setValue(mainSubCalendarImagePosY, 50);
      setValue(mainSubCalendarImageZoom, 100);

      return;

    }

    setValue(
      mainSubCalendarImagePosX,
      selectedSubEvent.calendar_image_pos_x ??
      selectedSubEvent.image_pos_x ??
      50
    );

    setValue(
      mainSubCalendarImagePosY,
      selectedSubEvent.calendar_image_pos_y ??
      selectedSubEvent.image_pos_y ??
      50
    );

    setValue(
      mainSubCalendarImageZoom,
      selectedSubEvent.calendar_image_zoom ??
      selectedSubEvent.image_zoom ??
      100
    );

  }



  // =========================
  // 메인 배너 안 하위 이벤트 이미지 DOM 직접 갱신
  // =========================

  function updateVisibleMainSubCalendarImages(subEventId, posX, posY, zoom) {

    if (!subEventId) return;

    const targetImages =
      Array.from(
        document.querySelectorAll(
          ".calendar-sub-event-contained .calendar-sub-image-zone img"
        )
      )
        .filter(img => {
          const subBanner =
            img.closest(".calendar-sub-event-contained");

          return subBanner?.dataset.subEventId === subEventId;
        });

    targetImages.forEach(img => {
      img.style.objectPosition =
        `${posX}% ${posY}%`;

      img.style.transform =
        `scale(${Number(zoom) / 100})`;

      img.style.transformOrigin =
        `${posX}% ${posY}%`;
    });

  }

  // =========================
  // 메인 편집창에서 선택한 하위 이벤트 배너 이미지 실시간 반영
  // =========================

  function updateSelectedMainSubCalendarPreview() {

    if (!currentEvent) return;

    const selectedSubEvent =
      currentMainSubEvents.find(subEvent => {
        return subEvent.id === currentMainSubCalendarSubId;
      });

    if (!selectedSubEvent) return;

    selectedSubEvent.calendar_image_pos_x =
      Number(safeValue(mainSubCalendarImagePosX, 50));

    selectedSubEvent.calendar_image_pos_y =
      Number(safeValue(mainSubCalendarImagePosY, 50));

    selectedSubEvent.calendar_image_zoom =
      Number(safeValue(mainSubCalendarImageZoom, 100));

    allMainEvents =
      allMainEvents.map(event => {

        if (event.id !== currentEvent.id) {
          return event;
        }

        const updatedSubEvents =
          (event.extendedProps.subEvents || []).map(subEvent => {

            if (subEvent.id !== selectedSubEvent.id) {
              return subEvent;
            }

            return {
              ...subEvent,
              calendar_image_pos_x:
                selectedSubEvent.calendar_image_pos_x,
              calendar_image_pos_y:
                selectedSubEvent.calendar_image_pos_y,
              calendar_image_zoom:
                selectedSubEvent.calendar_image_zoom,
            };

          });

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,

            subEvents:
              updatedSubEvents,
          },
        };

      });

    // 하위 배너 이미지 슬라이더 조작 중에는 캘린더 전체를 재렌더링하지 않습니다.
    // 전체 재렌더링을 하면 브라우저가 FullCalendar에 포커스를 다시 맞추며
    // 페이지가 최상단으로 튀는 경우가 있어, 현재 보이는 이미지 DOM만 즉시 갱신합니다.
    updateVisibleMainSubCalendarImages(
      selectedSubEvent.id,
      selectedSubEvent.calendar_image_pos_x,
      selectedSubEvent.calendar_image_pos_y,
      selectedSubEvent.calendar_image_zoom
    );

  }



  // =========================
  // 하위 이벤트 목록 렌더링
  // =========================

  function renderSubEvents() {

    if (!subEventList) return;

    if (isSubEventDragging) {
      return;
    }

    subEventList.innerHTML = "";

    if (currentSubEvents.length === 0) {

      subEventList.innerHTML =
        `<div class="empty-sub-events">등록된 하위 이벤트가 없습니다.</div>`;

      return;

    }

    currentSubEvents =
      sortSubEventsByDisplayOrder(
        currentSubEvents,
        currentDetailEvent?.id || ""
      );

    currentSubEvents.forEach((subEvent, index) => {

      const card =
        document.createElement("div");

      card.className =
        "sub-event-card";

      if (isAdmin) {
        card.draggable = true;
        card.title = "드래그해서 하위 이벤트 표시 순서 변경";
      }

      /* 하위 이벤트 카드를 정확히 찾기 위한 id */
      card.dataset.subEventId =
        subEvent.id;

      card.dataset.subDisplayOrder =
        String(
          Number.isFinite(Number(subEvent.display_order))
            ? Number(subEvent.display_order)
            : index
        );

      card.style.setProperty(
        "--event-color",
        subEvent.color || "#1f2937"
      );

      const subTextStyle = {
        textColor: subEvent.text_color,
        bgColor: subEvent.text_bg_color,
        bgAlpha: subEvent.text_bg_alpha,
        textSize: subEvent.text_size,
      };

      // =========================
      // 하위 이벤트 이미지 위치
      // DB에 값이 없으면 기본값 50 사용
      // 50 = 가운데 위치
      // =========================

      const imagePosX =
        subEvent.image_pos_x ?? 50;

      const imagePosY =
        subEvent.image_pos_y ?? 50;

      const imageZoom =
        subEvent.image_zoom ?? 100;

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
          style="
            object-position: ${imagePosX}% ${imagePosY}%;
            transform: scale(${Number(imageZoom) / 100});
            transform-origin: ${imagePosX}% ${imagePosY}%;
          "
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

            ${textBoxHtml("sub-event-title", subEvent.title, subTextStyle)}

            ${textBoxHtml("sub-event-description", subEvent.description || "", subTextStyle)}

          </div>

          ${isAdmin ? `
            <!-- 관리자 전용 하위 이벤트 수정 버튼 -->
            <button
              type="button"
              class="edit-sub-icon"
              title="하위 이벤트 수정"
            >
              ✏️
            </button>
          ` : ""}
        `;

      if (isAdmin) {

        const editSubButton =
          card.querySelector(".edit-sub-icon");

        if (editSubButton) {

          editSubButton.addEventListener(
            "click",
            (e) => {

              /* 카드 클릭 이벤트와 충돌 방지 */
              e.preventDefault();
              e.stopPropagation();

              openSubEventModal(subEvent);

            }
          );

        }

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
          event.extendedProps.rawEnd || subtractOneDay(event.endStr)
        );
    }

    if (detailDescription) {
      detailDescription.innerHTML =
        textBoxHtml(
          "detail-description-text",
          event.extendedProps.description || "",
          getEventTextStyleFromProps(event.extendedProps)
        );
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

    originalSubTextStyle = {
      textColor: subEvent?.text_color,
      bgColor: subEvent?.text_bg_color,
      bgAlpha: subEvent?.text_bg_alpha,
      textSize: subEvent?.text_size,
    };

    applyTextStyleInputs(
      "sub",
      originalSubTextStyle
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

    uploadedSubImageZoom =
      subEvent?.image_zoom ?? 100;

    /* 하위 이벤트 원래 이미지 위치 / 확대값 백업 */
    originalSubImagePosX =
      uploadedSubImagePosX;

    originalSubImagePosY =
      uploadedSubImagePosY;

    originalSubImageZoom =
      uploadedSubImageZoom;

    // 슬라이더 반영
    setValue(
      subImagePosX,
      uploadedSubImagePosX
    );

    setValue(
      subImagePosY,
      uploadedSubImagePosY
    );

    setValue(
      subImageZoom,
      uploadedSubImageZoom
    );


    if (subImageInput) {
      subImageInput.value = "";
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
  // 중요: 여기서 오류가 나도 상단 버튼/설정 버튼 이벤트는 아래에서 계속 붙어야 함
  // =========================

  try {

  const loadedEvents =
    await loadEventsFromSupabase();

  /* =========================
     각 메인 이벤트에 하위 이벤트 목록 붙이기
  ========================= */

  const loadedEventsWithSubEvents =
    await Promise.all(
      loadedEvents.map(async (event) => {

        const subEvents =
          await loadSubEvents(event.id);

        return {
          ...event,

          extendedProps: {
            ...event.extendedProps,

            /* 캘린더 표시용 하위 이벤트 목록 */
            subEvents,
          },
        };

      })
    );

  allMainEvents =
    [...loadedEventsWithSubEvents];

  allEvents =
    createCalendarEvents(allMainEvents);



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

      // =========================
      // 메인 이벤트 날짜 조절 옵션
      // - 관리자 모드에서 메인 배너 앞/뒤 리사이즈 핸들로 시작일/종료일을 수정합니다.
      // - 하위 이벤트(inlineSub)는 개별 event 설정으로 수정 불가 상태를 유지합니다.
      // =========================

      eventStartEditable:
        true,

      eventDurationEditable:
        true,

      eventResizableFromStart:
        true,

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

        if (
          info.event.extendedProps.displayType === "inlineSub"
        ) {

          info.revert();

          return;

        }

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
            subtractOneDay(info.event.endStr),

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

            imageZoom:
              info.event.extendedProps.imageZoom ?? 100,

            rawEnd:
              subtractOneDay(info.event.endStr) || "",

            subEvents:
              info.event.extendedProps.subEvents || [],
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

        allMainEvents =
          allMainEvents.map(event => {

            if (event.id === eventData.id) {
              return eventData;
            }

            return event;

          });

        applySearchFilter();

        showToast("이동 저장 완료");

      },



      // =========================
      // 일정 드래그 / 리사이즈 상태 추적
      // - 드래그나 리사이즈 직후 click 이벤트가 상세창을 여는 것을 방지합니다.
      // =========================

      eventDragStart: function () {
        markCalendarEventInteractionStart();
      },

      eventDragStop: function () {
        markCalendarEventInteractionEnd();
      },

      eventResizeStart: function () {
        markCalendarEventInteractionStart();
      },

      eventResizeStop: function () {
        markCalendarEventInteractionEnd();
      },



      // =========================
      // 일정 길이 조절 후 저장
      // - 메인 이벤트 앞/뒤 리사이즈 핸들로 시작일/종료일을 수정합니다.
      // - 저장 후 캘린더를 다시 그려도 리사이즈 기능이 계속 유지되도록 allMainEvents를 갱신합니다.
      // =========================

      eventResize: async function (info) {

        markCalendarEventInteractionEnd();

        if (
          info.event.extendedProps.displayType === "inlineSub"
        ) {

          info.revert();

          return;

        }

        if (!isAdmin) {

          info.revert();

          return;

        }

        const resizedEnd =
          subtractOneDay(info.event.endStr) ||
          info.event.startStr;

        const eventData = {

          id:
            info.event.id,

          title:
            info.event.title,

          start:
            info.event.startStr,

          end:
            resizedEnd,

          extendedProps: {
            image:
              info.event.extendedProps.image || "",

            color:
              info.event.extendedProps.color || "#1f2937",

            category:
              info.event.extendedProps.category || CATEGORY_DEFAULT,

            description:
              info.event.extendedProps.description || "",

            imagePosX:
              info.event.extendedProps.imagePosX ?? 50,

            imagePosY:
              info.event.extendedProps.imagePosY ?? 50,

            imageZoom:
              info.event.extendedProps.imageZoom ?? 100,

            textColor:
              info.event.extendedProps.textColor || "",

            textBgColor:
              info.event.extendedProps.textBgColor || "",

            textBgAlpha:
              info.event.extendedProps.textBgAlpha,

            textSize:
              info.event.extendedProps.textSize,

            rawEnd:
              resizedEnd || "",

            subEvents:
              info.event.extendedProps.subEvents || [],
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

        allMainEvents =
          allMainEvents.map(event => {

            if (event.id === eventData.id) {
              return eventData;
            }

            return event;

          });

        applySearchFilter();

        showToast("기간 저장 완료");

      },



      // =========================
      // Supabase에서 불러온 일정 표시
      // =========================

      events:
        allEvents,



      // =========================
      // 이벤트 배너 UI
      // =========================

      eventContent: function (info) {

        const displayType =
          info.event.extendedProps.displayType || "main";

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

        const imageZoom =
          info.event.extendedProps.imageZoom ?? 100;

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

    transform:
      scale(${Number(imageZoom) / 100});

    transform-origin:
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

        const compareTargetDate =
          info.event.extendedProps.rawEnd
            || subtractOneDay(info.event.endStr)
            || info.event.startStr;

        const compareDate =
          parseLocalDate(compareTargetDate);

        compareDate.setHours(0, 0, 0, 0);

        const isExpired =
          compareDate < today;

        const subContainedHtml =
          buildContainedSubEventsHtml(info.event);

        return {

          html: `
            <div
              class="game-event ${isExpired ? "expired" : ""}"
              data-main-event-id="${info.event.id}"
              style="--event-color: ${color}; --event-image-width: 33.333%;"
            >

              ${imageHtml}

              <div class="overlay">

                ${getCategoryBadge(category)}

                ${textBoxHtml(
                  "title",
                  info.event.title,
                  getEventTextStyleFromProps(info.event.extendedProps)
                )}

              </div>

              ${subContainedHtml}

            </div>
          `,

        };

      },


      // =========================
      // 이벤트 표시 후 처리
      // =========================

      eventDidMount: function (info) {

        info.el.style.setProperty(
          "--event-image-width",
          "33.333%"
        );

        const mainEventId =
          info.event.extendedProps.displayType === "inlineSub"
            ? info.event.extendedProps.parentEventId
            : info.event.id;

        const harness =
          info.el.closest(".fc-daygrid-event-harness");

        if (harness && mainEventId) {
          harness.dataset.groupEventId = mainEventId;
        }

        syncContainedSubEventsToSegment(info);

        if (info.event.extendedProps.displayType !== "inlineSub") {

          const mainBanner =
            info.el.querySelector(".game-event");

          const mainStart =
            info.event.startStr || "";

          const mainEnd =
            info.event.extendedProps.rawEnd ||
            subtractOneDay(info.event.endStr) ||
            mainStart;

          applyFixedDayImageRuleToBanner(
            mainBanner,
            getInclusiveDateDuration(mainStart, mainEnd),
            getCalendarDayCellWidthFromElement(info.el)
          );

        }

        if (
          harness &&
          info.event.extendedProps.displayType === "inlineSub"
        ) {

          const subDurationDays =
            Math.max(
              1,
              Number(info.event.extendedProps.subDurationDays || 1)
            );

          const subOverlapLevel =
            Number(info.event.extendedProps.subOverlapLevel || 0);

          harness.style.setProperty(
            "--sub-duration-days",
            String(subDurationDays)
          );

          harness.style.setProperty(
            "--sub-overlap-level",
            String(subOverlapLevel)
          );

          info.el.style.setProperty(
            "--sub-duration-days",
            String(subDurationDays)
          );

          if (info.event.extendedProps.subOverlapShift) {
            harness.classList.add("sub-overlap-shift-harness");
            info.el.classList.add("sub-overlap-shift-event");
          }

          if (info.event.extendedProps.subOverlapRaised) {
            harness.classList.add("sub-overlap-raised-harness");
            info.el.classList.add("sub-overlap-raised-event");
          }

        }

        const setGroupHover = (isHovering) => {

          if (!mainEventId) return;

          document
            .querySelectorAll(
              `.fc-daygrid-event-harness[data-group-event-id="${mainEventId}"]`
            )
            .forEach(element => {
              element.classList.toggle(
                "event-group-hover-harness",
                isHovering
              );
            });

          document
            .querySelectorAll(
              `.game-event[data-main-event-id="${mainEventId}"], .calendar-sub-event[data-parent-event-id="${mainEventId}"]`
            )
            .forEach(element => {
              element.classList.toggle(
                "event-group-hover",
                isHovering
              );
            });

        };

        info.el.addEventListener(
          "mouseenter",
          () => setGroupHover(true)
        );

        info.el.addEventListener(
          "mouseleave",
          () => setGroupHover(false)
        );

        // =========================
        // 메인 이벤트 클릭 = 상세 보기
        // - 클릭 판정은 내부 텍스트/이미지/그라데이션이 아니라 FullCalendar 이벤트 요소(info.el) 하나로 통일합니다.
        // - 내부 레이어가 클릭을 가로채지 않게 CSS에서 pointer-events를 정리하고, 여기서는 실제 이동이 없는 클릭만 처리합니다.
        // - 드래그 이동 / 일정 길이 조절은 FullCalendar 기본 동작을 유지해야 하므로, 마우스 이동이 있거나 리사이즈 핸들을 누른 경우에는 상세창을 열지 않습니다.
        // =========================

        if (info.event.extendedProps.displayType !== "inlineSub") {

          let clickStartX = 0;
          let clickStartY = 0;
          let isResizeHandleClick = false;

          info.el.addEventListener(
            "pointerdown",
            (e) => {
              clickStartX = e.clientX;
              clickStartY = e.clientY;
              isResizeHandleClick = Boolean(
                e.target.closest(".fc-event-resizer")
              );
            }
          );

          info.el.addEventListener(
            "click",
            (e) => {

              if (isEditingMainEvent) return;

              if (isCalendarEventInteractionCoolingDown()) return;

              if (isResizeHandleClick) return;

              const moveDistance =
                Math.hypot(
                  e.clientX - clickStartX,
                  e.clientY - clickStartY
                );

              if (moveDistance > 6) return;

              e.preventDefault();
              e.stopPropagation();

              openDetailModal(
                info.event
              );

            }
          );

        }

      },

    });





  // =========================
  // 안정1 클릭 보정: 캘린더 루트 위임 클릭
  // - 내부 이미지/그라데이션/하위 배너 레이어가 클릭을 가로채도
  //   실제 좌표 아래의 메인 배너를 찾아 상세창을 엽니다.
  // - 드래그 이동 / 리사이즈 / 편집 UI / 모달 동작은 기존 기능을 보존합니다.
  // =========================

  function setupMainBannerDelegatedClick() {

    if (!calendarEl || calendarEl.dataset.mainClickDelegated === "true") {
      return;
    }

    calendarEl.dataset.mainClickDelegated =
      "true";

    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartedOnResize = false;

    calendarEl.addEventListener(
      "pointerdown",
      (e) => {
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        pointerStartedOnResize = Boolean(
          e.target.closest(".fc-event-resizer")
        );
      },
      true
    );

    calendarEl.addEventListener(
      "click",
      (e) => {

        if (isEditingMainEvent) return;
        if (isCalendarEventInteractionCoolingDown()) return;
        if (pointerStartedOnResize) return;

        // FullCalendar 드래그 이동 / 길이 조절 직후 발생하는 클릭은 상세창을 열지 않습니다.
        const moveDistance =
          Math.hypot(
            e.clientX - pointerStartX,
            e.clientY - pointerStartY
          );

        if (moveDistance > 6) return;

        // 편집 UI, 버튼, 입력창, 리사이즈 핸들은 기존 동작을 우선합니다.
        if (
          e.target.closest(
            "button, input, textarea, select, label, .fc-event-resizer, .modal"
          )
        ) {
          return;
        }

        const pointElements =
          typeof document.elementsFromPoint === "function"
            ? document.elementsFromPoint(e.clientX, e.clientY)
            : [];

        const gameEvent =
          e.target.closest?.(".game-event") ||
          pointElements
            .map(element => element.closest?.(".game-event"))
            .find(Boolean) ||
          pointElements
            .map(element => element.closest?.(".fc-event"))
            .find(element => element?.querySelector?.(".game-event"))
            ?.querySelector(".game-event");

        if (!gameEvent) return;

        const mainEventId =
          gameEvent.dataset.mainEventId || "";

        if (!mainEventId) return;

        const mainEvent =
          calendar?.getEventById(mainEventId);

        if (!mainEvent) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        openDetailModal(mainEvent);

      },
      true
    );

  }

  // =========================
  // 캘린더 표시
  // =========================

  calendar.render();

  setupMainBannerDelegatedClick();



  // =========================
  // 최초 로그인 상태 확인
  // =========================

  await loadCalendarSettings();

  await checkLoginStatus();

  } catch (error) {

    console.error("초기 로딩 중 오류", error);

    try {
      await loadCalendarSettings();
    } catch (settingsError) {
      console.error("캘린더 설정 로딩 오류", settingsError);
    }

    try {
      await checkLoginStatus();
    } catch (authError) {
      console.error("로그인 상태 확인 오류", authError);
    }

  }



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
  // 캘린더 설정 버튼
  // =========================

  editCalendarSettingsBtn?.addEventListener(
    "click",
    () => {

      if (!isAdmin) return;

      applyCalendarSettings();

      show(calendarSettingsModal);

    }
  );

  saveCalendarSettingsBtn?.addEventListener(
    "click",
    saveCalendarSettings
  );

  closeCalendarSettingsBtn?.addEventListener(
    "click",
    () => {

      applyCalendarSettings();
      applySearchFilter();

      hide(calendarSettingsModal);

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

      if (currentEvent) {

        currentMainSubEvents =
          currentMainSubEvents.map(subEvent => {

            if (subEvent.id !== currentMainSubCalendarSubId) {
              return subEvent;
            }

            return {
              ...subEvent,

              calendar_image_pos_x:
                Number(safeValue(mainSubCalendarImagePosX, 50)),

              calendar_image_pos_y:
                Number(safeValue(mainSubCalendarImagePosY, 50)),

              calendar_image_zoom:
                Number(safeValue(mainSubCalendarImageZoom, 100)),
            };

          });

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

          imageZoom:
            Number(
              safeValue(eventImageZoom, 100)
            ),

          category,

          description,

          textColor:
            readTextStyleInputs("event").textColor,

          textBgColor:
            readTextStyleInputs("event").bgColor,

          textBgAlpha:
            readTextStyleInputs("event").bgAlpha,

          textSize:
            readTextStyleInputs("event").textSize,

          rawEnd:
            end || "",

          subEvents:
            currentMainSubEvents,
        },

      };

      const ok =
        currentEvent
          ? await updateEventInSupabase(eventData)
          : await insertEventToSupabase(eventData);

      if (!ok) return;

      if (currentEvent && currentMainSubEvents.length > 0) {

        for (const subEvent of currentMainSubEvents) {

          await updateSubEventInSupabase(subEvent);

        }

      }

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

        const eventTextStyle =
          readTextStyleInputs("event");

        currentEvent.setExtendedProp(
          "textColor",
          eventTextStyle.textColor
        );

        currentEvent.setExtendedProp(
          "textBgColor",
          eventTextStyle.bgColor
        );

        currentEvent.setExtendedProp(
          "textBgAlpha",
          eventTextStyle.bgAlpha
        );

        currentEvent.setExtendedProp(
          "textSize",
          eventTextStyle.textSize
        );

        currentEvent.setExtendedProp(
          "rawEnd",
          end || ""
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

        currentEvent.setExtendedProp(
          "imageZoom",
          Number(
            safeValue(eventImageZoom, 100)
          )
        );

        currentEvent.setExtendedProp(
          "subEvents",
          currentMainSubEvents
        );

        allMainEvents =
          allMainEvents.map(event => {

            if (event.id === eventData.id) {
              return eventData;
            }

            return event;

          });

        showToast("수정 완료");

      } else {

        allMainEvents.push(eventData);

        showToast("추가 완료");

      }

      applySearchFilter();

      /* 메인 이벤트 편집 상태 OFF */
      isEditingMainEvent = false;

      /* 현재 편집 이벤트 참조 해제 */
      originalEventTextStyle = null;

      currentEvent = null;
      currentMainSubEvents = [];
      currentMainSubCalendarSubId = "";

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

      allMainEvents =
        allMainEvents.filter(event => {

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

        text_color:
          readTextStyleInputs("sub").textColor,

        text_bg_color:
          readTextStyleInputs("sub").bgColor,

        text_bg_alpha:
          readTextStyleInputs("sub").bgAlpha,

        text_size:
          readTextStyleInputs("sub").textSize,

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

        image_zoom:
          Number(
            safeValue(subImageZoom, 100)
          ),

        calendar_image_pos_x:
          currentSubEvent?.calendar_image_pos_x ??
          Number(safeValue(subImagePosX, 50)),

        calendar_image_pos_y:
          currentSubEvent?.calendar_image_pos_y ??
          Number(safeValue(subImagePosY, 50)),

        calendar_image_zoom:
          currentSubEvent?.calendar_image_zoom ??
          Number(safeValue(subImageZoom, 100)),

      };

      const isEditingSubEvent =
        Boolean(currentSubEvent);

      const ok =
        isEditingSubEvent
          ? await updateSubEventInSupabase(subData)
          : await insertSubEventToSupabase(subData);

      if (!ok) return;

      currentSubEvents =
        await loadSubEvents(
          currentDetailEvent.id
        );

      renderSubEvents();

      /* =========================
   하위 이벤트 저장 후
   캘린더의 메인 이벤트에도 하위 이벤트 목록 즉시 반영
========================= */

allMainEvents =
  allMainEvents.map(event => {

    if (event.id === currentDetailEvent.id) {

      return {
        ...event,

        extendedProps: {
          ...event.extendedProps,

          subEvents:
            currentSubEvents,
        },
      };

    }

    return event;

  });

applySearchFilter();

      originalSubTextStyle = null;

      currentSubEvent =
        null;

      hide(subEventModal);

      showToast(
        isEditingSubEvent
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

      /* =========================
   하위 이벤트 삭제 후
   캘린더의 메인 이벤트에도 하위 이벤트 목록 즉시 반영
========================= */

allMainEvents =
  allMainEvents.map(event => {

    if (event.id === currentDetailEvent.id) {

      return {
        ...event,

        extendedProps: {
          ...event.extendedProps,

          subEvents:
            currentSubEvents,
        },
      };

    }

    return event;

  });

applySearchFilter();

      currentSubEvent =
        null;

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

      if (currentEvent) {

        const img =
          findCurrentEventCalendarImage();

        if (img) {

          img.style.objectPosition =
            `${originalImagePosX}% ${originalImagePosY}%`;

          img.style.transform =
            `scale(${Number(originalImageZoom) / 100})`;

          img.style.transformOrigin =
            `${originalImagePosX}% ${originalImagePosY}%`;

        }

      }

      restoreEventTextStylePreview();

      /* 메인 이벤트 편집 상태 OFF */
      isEditingMainEvent = false;

      /* 현재 편집 이벤트 참조 해제 */
      currentEvent = null;

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

      const img =
        findCurrentSubEventCardImage();

      if (img) {

        img.style.objectPosition =
          `${originalSubImagePosX}% ${originalSubImagePosY}%`;

        img.style.transform =
          `scale(${Number(originalSubImageZoom) / 100})`;

        img.style.transformOrigin =
          `${originalSubImagePosX}% ${originalSubImagePosY}%`;

      }

      restoreSubTextStylePreview();

      currentSubEvent =
        null;

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

        restoreEventTextStylePreview();

        isEditingMainEvent = false;
        currentEvent = null;
        currentMainSubEvents = [];
        currentMainSubCalendarSubId = "";

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

  calendarSettingsModal?.addEventListener(
    "click",
    (e) => {

      if (e.target === calendarSettingsModal) {
        applyCalendarSettings();
        applySearchFilter();
        hide(calendarSettingsModal);
      }

    }
  );

  subEventModal?.addEventListener(
    "click",
    (e) => {

      if (e.target === subEventModal) {

        const img =
          findCurrentSubEventCardImage();

        if (img) {

          img.style.objectPosition =
            `${originalSubImagePosX}% ${originalSubImagePosY}%`;

          img.style.transform =
            `scale(${Number(originalSubImageZoom) / 100})`;

          img.style.transformOrigin =
            `${originalSubImagePosX}% ${originalSubImagePosY}%`;

        }

        restoreSubTextStylePreview();

        currentSubEvent =
          null;

        hide(subEventModal);
        hide(calendarSettingsModal);
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
        hide(calendarSettingsModal);

      }

    }
  );

});