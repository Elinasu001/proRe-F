import "./expertWizard.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* team common UI */
import Input, { TimeRangeInput, ImageUpload, TextArea, CheckboxGroup } from "../Common/Input/Input.jsx";
import Button from "../Common/Button/Button.jsx";
import Alert from "../Common/Alert/Alert.jsx";

import { useAuth } from "../../context/AuthContext.jsx";

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";
const GET_TREE_URL = `${apiUrl}/api/experts/registration`;

const EXPERT_TYPE_ICON = {
  1: new URL("../../assets/images/common/event.svg", import.meta.url).href,
  2: new URL("../../assets/images/common/tutor.png", import.meta.url).href,
  3: new URL("../../assets/images/common/programming.svg", import.meta.url).href,
};

/* time utils */
function dateToHHmm(d) {
  if (!d) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function hhmmToDate(hhmm) {
  if (!hhmm || typeof hhmm !== "string") return null;
  const [hh, mm] = hhmm.split(":").map((x) => parseInt(x, 10));
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  const d = new Date();
  d.setHours(hh, mm, 0, 0);
  return d;
}

export default function ExpertWizard({
  mode = "create", // "create" | "edit"
  initialData = null,
  onSubmit, // (FormData) => axios promise
  successRedirect = "/mypage",
}) {
  const navigate = useNavigate();

  /* step */
  const [step, setStep] = useState(1);

  /* tree */
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);

  /* selected */
  const [selectedLarge, setSelectedLarge] = useState(null);
  const [selectedMiddle, setSelectedMiddle] = useState(null);
  const [selectedDetailNos, setSelectedDetailNos] = useState([]);

  /* form */
  const [form, setForm] = useState({
    career: "",
    content: "",
    businessRegNo: "",
    startTimeDate: null,
    endTimeDate: null,
    newImages: [],
    /* edit only */
    existingAttachments: [],
    deleteFileNos: [],
  });

  /* career validation */
    const careerNum = Number(form.career);
    const isCareerValid =
    String(form.career).trim() !== "" &&
    Number.isFinite(careerNum) &&
    careerNum >= 1 &&
    careerNum <= 50;

    /* 유저 정보 */
    const { currentUser } = useAuth();

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  /* alert state */
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    variant: "default", // "default" | "danger"
    confirmText: "확인",
    cancelText: "취소",
    hasCancel: false,
    onConfirm: null,
    onCancel: null,
  });

  const closeAlert = () => setAlertState((prev) => ({ ...prev, isOpen: false }));

  const openAlert = ({
    title = "알림",
    message = "",
    variant = "default",
    confirmText = "확인",
    cancelText = "취소",
    onConfirm,
    onCancel,
  }) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      variant,
      confirmText,
      cancelText,
      hasCancel: !!onCancel,
      onConfirm: onConfirm || (() => closeAlert()),
      onCancel: onCancel || null,
    });
  };

  /* 1) fetch tree */
  useEffect(() => {

    // create 모드에서만 막고 싶으면 조건 추가
  if (mode === "create" && currentUser?.userRole === "ROLE_EXPERT") {
    openAlert({
      title: "접근 불가",
      message: "이미 전문가인 계정은 접근할 수 없습니다.",
      confirmText: "홈으로 이동",
      onConfirm: () => {
        closeAlert();
        navigate("/", { replace: true });
      },
    });
  }

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(GET_TREE_URL);
        const list = res.data?.data ?? [];
        if (!mounted) return;
        setTree(list);
      } catch (e) {
        console.error(e);

        if (e?.response?.status === 403) {
          openAlert({
            title: "접근 권한 없음",
            message: "로그인이 필요하거나 접근 권한이 없습니다.",
            confirmText: "로그인 이동",
            onConfirm: () => {
              closeAlert();
              navigate("/login");
            },
          });
          return;
        }

        openAlert({
          title: "카테고리 조회 실패",
          message: "카테고리를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
          onConfirm: closeAlert,
        });

        setTree([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, currentUser, navigate]);

  /* 2) init edit */
  useEffect(() => {
    // edit 모드에서만 막고 싶으면 조건 추가
  if (mode === "edit" && currentUser?.userRole === "ROLE_USER") {
    openAlert({
      title: "접근 불가",
      message: "일반 회원은 접근할 수 없습니다.",
      confirmText: "홈으로 이동",
      onConfirm: () => {
        closeAlert();
        navigate("/", { replace: true });
      },
    });
  }

    if (mode !== "edit") return;
    if (!initialData) return;
    if (!tree.length) return;

    const { expert, categories, attachments } = initialData;

    const lc = tree.find((x) => x.expertTypeNo === expert?.expertTypeNo) || null;

    let matchedMiddle = null;
    if (lc?.categories?.length) {
      for (const mc of lc.categories) {
        const smalls = mc?.categories ?? [];
        const hasAny = smalls.some((sc) => (categories ?? []).includes(sc.categoryDetailNo));
        if (hasAny) {
          matchedMiddle = mc;
          break;
        }
      }
    }

    setSelectedLarge(lc);
    setSelectedMiddle(matchedMiddle);
    setSelectedDetailNos(categories ?? []);

    setForm((prev) => ({
      ...prev,
      career: String(expert?.career ?? ""),
      content: expert?.content ?? "",
      businessRegNo: expert?.businessRegNo ?? "",
      startTimeDate: hhmmToDate(expert?.startTime ?? ""),
      endTimeDate: hhmmToDate(expert?.endTime ?? ""),
      existingAttachments: attachments ?? [],
      deleteFileNos: [],
      newImages: [],
    }));
  }, [mode, initialData, tree]);

  /* derived list */
  const middleList = useMemo(() => selectedLarge?.categories ?? [], [selectedLarge]);
  const smallList = useMemo(() => selectedMiddle?.categories ?? [], [selectedMiddle]);

  /* step validation */
  const canGoNext = useMemo(() => {
    if (step === 1) return !!selectedLarge;
    if (step === 2) return !!selectedMiddle;
    if (step === 3) return selectedDetailNos.length > 0;

    if (step === 4) {
  const start = dateToHHmm(form.startTimeDate);
  const end = dateToHHmm(form.endTimeDate);
  return isCareerValid && start !== "" && end !== "" && String(form.content).trim() !== "";
}

    return true;
  }, [step, selectedLarge, selectedMiddle, selectedDetailNos, form, isCareerValid]);

  const next = () => {
    if (!canGoNext) {
      openAlert({
        title: "입력 확인",
        message: "현재 단계에서 필요한 선택/입력이 완료되지 않았습니다.",
        onConfirm: closeAlert,
      });
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  /* select handlers */
  const chooseLarge = (large) => {
    setSelectedLarge(large);
    setSelectedMiddle(null);
    setSelectedDetailNos([]);
  };

  const chooseMiddle = (middle) => {
    setSelectedMiddle(middle);
    setSelectedDetailNos([]);
  };

  /* STEP2: CheckboxGroup를 단일 선택처럼 쓰기 */
const handleMiddleSingleSelect = (vals) => {
  const last = (vals || []).slice(-1)[0]; /* 마지막으로 누른 값만 유지 */
  if (!last) {
    setSelectedMiddle(null);
    setSelectedDetailNos([]);
    return;
  }
  const picked = middleList.find((mc) => String(mc.categoryNo) === String(last));
  if (picked) chooseMiddle(picked);
};

  /* STEP3: CheckboxGroup 최대 3개 제한 */
const handleDetailMax3 = (vals) => {
  const next = (vals || []).map(String);

  if (next.length > 3) {
    openAlert({
      title: "선택 제한",
      message: "소분류는 최대 3개까지 선택 가능합니다.",
      onConfirm: closeAlert,
    });
    return;
  }

  setSelectedDetailNos(next.map((v) => Number(v)));
};

  /* edit: remove existing file */
  const confirmRemoveExisting = (fileNo) => {
    openAlert({
      title: "첨부 삭제",
      message: "기존 첨부를 삭제할까요?\n(저장은 최종 제출 시 반영됩니다.)",
      variant: "danger",
      confirmText: "삭제",
      cancelText: "취소",
      onCancel: closeAlert,
      onConfirm: () => {
        setForm((prevState) => ({
          ...prevState,
          existingAttachments: (prevState.existingAttachments || []).filter((f) => f.fileNo !== fileNo),
          deleteFileNos: [...(prevState.deleteFileNos || []), fileNo],
        }));
        closeAlert();
      },
    });
  };

  /* submit */
  const doSubmit = async () => {
    try {
      const fd = new FormData();

      /* categories */
      fd.append("expertTypeNo", String(selectedLarge?.expertTypeNo ?? ""));
      fd.append("categoryNo", String(selectedMiddle?.categoryNo ?? ""));
      selectedDetailNos.forEach((n) => fd.append("categoryDetailNos", String(n)));

      /* expert info */
      fd.append("career", String(form.career));
      fd.append("startTime", dateToHHmm(form.startTimeDate));
      fd.append("endTime", dateToHHmm(form.endTimeDate));
      fd.append("content", form.content);

      if (String(form.businessRegNo ?? "").trim() !== "") {
        fd.append("businessRegNo", String(form.businessRegNo).trim());
      }

      /* edit only */
      if (mode === "edit") {
        (form.deleteFileNos || []).forEach((no) => fd.append("deleteFileNos", String(no)));
      }

      /* new attachments */
      (form.newImages || []).forEach((img) => {
        if (img?.file) fd.append("newFiles", img.file);
      });

      const res = await onSubmit(fd);

      if (res?.data?.success === false) {
        openAlert({
          title: "처리 실패",
          message: res?.data?.message || "처리에 실패했습니다.",
          onConfirm: closeAlert,
        });
        return;
      }

      openAlert({
        title: "완료",
        message: res?.data?.message || (mode === "edit" ? "수정이 완료되었습니다." : "등록이 완료되었습니다."),
        confirmText: "확인",
        onConfirm: () => {
          closeAlert();
          navigate(successRedirect);
        },
      });
    } catch (e) {
      console.error(e);
      openAlert({
        title: "요청 실패",
        message: mode === "edit" ? "수정 요청에 실패했습니다." : "등록 요청에 실패했습니다.",
        onConfirm: closeAlert,
      });
    }
  };

  const submit = () => {
    if (!canGoNext) {
        openAlert({
            title: "입력 확인",
            message: "필수 입력을 확인해주세요.",
            onConfirm: closeAlert,
        });
        return;
        }
    openAlert({
      title: mode === "edit" ? "전문가 정보 수정" : "전문가 등록",
      message: mode === "edit" ? "입력한 내용으로 수정할까요?" : "입력한 내용으로 등록할까요?",
      confirmText: mode === "edit" ? "수정" : "등록",
      cancelText: "취소",
      onCancel: closeAlert,
      onConfirm: () => {
        closeAlert();
        doSubmit();
      },
    });
  };

  /* loading */
  if (loading) {
    return (
      <main className="expert-main">
        <div className="expert-wrap">
          <section className="expert-card">
            <div className="loading-text">불러오는 중...</div>

            {/* bottom progress */}
            <div className="step-indicator-bottom">
              <StepIndicator step={step} />
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="expert-main">
        <div className="expert-wrap">
          <section className="expert-card">
            {/* content area */}
            <div className="expert-content">
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h2 className="title">어떤 분야의 전문가인가요?</h2>

                  <div className="choice-grid">
                    {tree.map((lc) => {
                      const active = selectedLarge?.expertTypeNo === lc.expertTypeNo;
                      const iconSrc = EXPERT_TYPE_ICON[lc.expertTypeNo];

                      return (
                        <Button
                          key={lc.expertTypeNo}
                          type="button"
                          fullWidth
                          variant="outline"
                          className={`choice-card ${active ? "active" : ""}`}
                          onClick={() => chooseLarge(lc)}
                        >
                          <div className="choice-inner">
                            <div className="choice-iconBox">
                              {iconSrc && <img className="choice-icon" src={iconSrc} alt="" />}
                            </div>
                            <div className="choice-label">{lc.expertName}</div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* STEP 2 */}
            {step === 2 && (
            <div>
                <h2 className="title">카테고리를 선택해주세요</h2>

                <div className="picked">
                선택된 분야: <b>{selectedLarge?.expertName}</b>
                </div>
                <div className="checkbox-scope">
                <CheckboxGroup
                
                options={middleList.map((mc) => ({
                    label: mc.categoryName,
                    value: String(mc.categoryNo),
                }))}
                selectedValues={selectedMiddle ? [String(selectedMiddle.categoryNo)] : []}
                onChange={(vals) => handleMiddleSingleSelect(vals)}
                />
                </div>
            </div>
            )}
              

            {/* STEP 3 */}
            {step === 3 && (
            <div>
                <h2 className="title">어떤 서비스를 진행할 수 있나요? (최대 3개)</h2>

                <div className="picked">
                선택: <b>{selectedLarge?.expertName}</b> → <b>{selectedMiddle?.categoryName}</b>
                </div>
                <div className="checkbox-scope">
                <CheckboxGroup
                
                options={smallList.map((sc) => ({
                    label: sc.categoryDetailName,
                    value: String(sc.categoryDetailNo),
                }))}
                selectedValues={selectedDetailNos.map(String)}
                onChange={(vals) => handleDetailMax3(vals)}
                />
                </div>
                <div className="helper">선택됨: {selectedDetailNos.length}개</div>
            </div>
            )}

              {/* STEP 4 */}
              {step === 4 && (
                <div>
                  <h2 className="title">전문가 정보를 입력해주세요</h2>

                  <div className="">
                    <span>경력(년)</span>
                    <Input
                        placeholder="1 ~ 50"
                        value={form.career}
                        onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 2); /* 1~50 => 최대 2자리 */
                            updateForm("career", v);
                        }}
                        $error={String(form.career).trim() !== "" && !isCareerValid}
                        errorMessage="경력은 1~50년 사이로만 선택 가능합니다."
                        />
                  </div>

                  <div className="field">
                    <TimeRangeInput
                      label="연락 가능 시간"
                      startValue={form.startTimeDate}
                      endValue={form.endTimeDate}
                      onStartChange={(d) => updateForm("startTimeDate", d)}
                      onEndChange={(d) => updateForm("endTimeDate", d)}
                    />
                  </div>

                  <div className="field">
                    <TextArea
                      label="소개글"
                      value={form.content}
                      onChange={(e) => updateForm("content", e.target.value)}
                      maxLength={2000}
                      placeholder="예) 어떤 서비스를 제공하는지, 강점, 진행 방식 등을 적어주세요."
                    />
                  </div>

                  <div className="field">
                    <span>사업자등록번호(선택)</span>
                    <Input
                      placeholder="10자리 숫자"
                      value={form.businessRegNo}
                      onChange={(e) =>
                        updateForm("businessRegNo", e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                    />
                  </div>

                  {/* edit: existing attachments */}
                  {mode === "edit" && (
                    <div className="field">
                      <span>기존 첨부</span>

                      <ul className="file-list">
                        {(form.existingAttachments || []).map((a) => (
                          <li key={a.fileNo}>
                            <a href={a.filePath} target="_blank" rel="noreferrer">
                              {a.originName}
                            </a>
                            <Button variant="outline" type="button" onClick={() => confirmRemoveExisting(a.fileNo)}>
                              삭제
                            </Button>
                          </li>
                        ))}
                      </ul>

                      <div className="helper">삭제 예정: {(form.deleteFileNos || []).length}개</div>
                    </div>
                  )}

                  {/* new images */}
                  <div className="field">
                    <ImageUpload
                      label="첨부 이미지(최대 4개)"
                      images={form.newImages}
                      onChange={(imgs) => updateForm("newImages", imgs)}
                      maxImages={Math.max(0, 4 - (form.existingAttachments || []).length)}
                    />
                    <div className="helper">
                      총 첨부: {(form.existingAttachments || []).length + (form.newImages || []).length} / 4
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* bottom area */}
            <div className="expert-bottom">
            {/* progress */}
            <div className="step-indicator-bottom">
                <StepIndicator step={step} />
            </div>

            {/* nav buttons (step 1~4) */}
            <div className="btn-row">
                <Button variant="outline" type="button" onClick={prev} disabled={step === 1}>
                이전
                </Button>

                {step < 4 ? (
                <Button variant="primary" type="button" onClick={next} disabled={!canGoNext}>
                    다음
                </Button>
                ) : (
                <Button variant="primary" type="button" onClick={submit} disabled={!canGoNext}>
                    {mode === "edit" ? "수정하기" : "등록하기"}
                </Button>
                )}
                </div>
            </div>
          </section>
        </div>
      </main>

      {/* common alert */}
      <Alert
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        variant={alertState.variant}
        confirmText={alertState.confirmText}
        cancelText={alertState.cancelText}
        onConfirm={alertState.onConfirm}
        onCancel={alertState.hasCancel ? alertState.onCancel : undefined}
      />
    </>
  );
}

/* step indicator */
function StepIndicator({ step }) {
  return (
    <div className="step-indicator">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className={`dot ${step === n ? "active" : ""}`} />
      ))}
    </div>
  );
}
