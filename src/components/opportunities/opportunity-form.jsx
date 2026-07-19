"use client";

import { useEffect, useMemo, useState } from "react";
import { ImagePlus, LoaderCircle, Save, UploadCloud, X } from "lucide-react";

import {
  educationLevels,
  fundingTypes,
  opportunityCategories,
} from "@/constants/opportunity-options";
import { uploadImages } from "@/services/opportunity-service";

const inputClassName =
  "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";
const textareaClassName =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";
const labelClassName = "mb-2 block text-sm font-semibold text-slate-700";

const splitValues = (value = "") =>
  String(value)
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

const joinValues = (values = []) => (Array.isArray(values) ? values.join("\n") : "");

const dateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const createFormState = (opportunity) => ({
  title: opportunity?.title || "",
  providerName: opportunity?.providerName || "",
  providerLogo: opportunity?.providerLogo || "",
  shortDescription: opportunity?.shortDescription || "",
  fullDescription: opportunity?.fullDescription || "",
  category: opportunity?.category || "graduate-scholarship",
  educationLevels: opportunity?.educationLevels || ["masters"],
  fieldsOfStudy: joinValues(opportunity?.fieldsOfStudy),
  fundingType: opportunity?.funding?.type || "fully-funded",
  fundingAmount: opportunity?.funding?.amount ?? "",
  fundingCurrency: opportunity?.funding?.currency || "USD",
  fundingCoverage: joinValues(opportunity?.funding?.coverage),
  fundingDescription: opportunity?.funding?.description || "",
  applicationOpenDate: dateInputValue(opportunity?.applicationOpenDate),
  deadline: dateInputValue(opportunity?.deadline),
  eligibleCountries: joinValues(opportunity?.eligibleCountries),
  eligibleNationalities: joinValues(opportunity?.eligibleNationalities),
  minimumGpa: opportunity?.minimumGpa ?? "",
  gpaScale: opportunity?.gpaScale ?? "",
  minimumAge: opportunity?.minimumAge ?? "",
  maximumAge: opportunity?.maximumAge ?? "",
  requirements: joinValues(opportunity?.requirements),
  requiredDocuments: joinValues(opportunity?.requiredDocuments),
  benefits: joinValues(opportunity?.benefits),
  applicationSteps: joinValues(opportunity?.applicationSteps),
  officialSourceUrl: opportunity?.officialSourceUrl || "",
  applicationUrl: opportunity?.applicationUrl || "",
});

const nullableNumber = (value) => (value === "" ? null : Number(value));

function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function OpportunityForm({
  initialOpportunity = null,
  onSubmit,
  submitLabel = "Submit opportunity",
}) {
  const [form, setForm] = useState(() => createFormState(initialOpportunity));
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [coverPreview, setCoverPreview] = useState(initialOpportunity?.coverImage || "");
  const [savedGallery, setSavedGallery] = useState(() =>
    (initialOpportunity?.images || []).map((url, index) => ({
      url,
      publicId: initialOpportunity?.imagePublicIds?.[index] || "",
    }))
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(createFormState(initialOpportunity));
    setCoverFile(null);
    setGalleryFiles([]);
    setCoverPreview(initialOpportunity?.coverImage || "");
    setSavedGallery(
      (initialOpportunity?.images || []).map((url, index) => ({
        url,
        publicId: initialOpportunity?.imagePublicIds?.[index] || "",
      }))
    );
  }, [initialOpportunity]);

  useEffect(() => {
    if (!coverFile) return undefined;
    const objectUrl = URL.createObjectURL(coverFile);
    setCoverPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile]);

  const galleryPreviews = useMemo(
    () =>
      galleryFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [galleryFiles]
  );

  useEffect(
    () => () => galleryPreviews.forEach((item) => URL.revokeObjectURL(item.url)),
    [galleryPreviews]
  );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleEducationLevel = (level) => {
    setForm((current) => {
      const exists = current.educationLevels.includes(level);
      const nextLevels = exists
        ? current.educationLevels.filter((item) => item !== level)
        : [...current.educationLevels, level];

      return {
        ...current,
        educationLevels: nextLevels.length > 0 ? nextLevels : current.educationLevels,
      };
    });
  };

  const handleGallerySelection = (event) => {
    const files = Array.from(event.target.files || []);
    const availableSlots = Math.max(5 - savedGallery.length - galleryFiles.length, 0);

    if (availableSlots > 0) {
      setGalleryFiles((current) => [...current, ...files.slice(0, availableSlots)]);
    }

    event.target.value = "";
  };

  const removeNewGalleryFile = (indexToRemove) => {
    setGalleryFiles((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setSubmitting(true);

    try {
      let coverAsset = initialOpportunity?.coverImage
        ? {
            url: initialOpportunity.coverImage,
            publicId: initialOpportunity.coverImagePublicId || "",
          }
        : null;

      if (coverFile) {
        const uploaded = await uploadImages([coverFile]);
        coverAsset = uploaded[0];
      }

      if (!coverAsset) {
        throw new Error("A cover image is required.");
      }

      let uploadedGallery = [];
      if (galleryFiles.length > 0) {
        uploadedGallery = await uploadImages(galleryFiles);
      }

      const imageAssets = [...savedGallery, ...uploadedGallery].slice(0, 5);

      const payload = {
        title: form.title.trim(),
        providerName: form.providerName.trim(),
        providerLogo: form.providerLogo.trim(),
        coverAsset: {
          url: coverAsset.url,
          publicId: coverAsset.publicId || "",
        },
        imageAssets: imageAssets.map((asset) => ({
          url: asset.url,
          publicId: asset.publicId || "",
        })),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        category: form.category,
        educationLevels: form.educationLevels,
        fieldsOfStudy: splitValues(form.fieldsOfStudy),
        funding: {
          type: form.fundingType,
          amount: Number(form.fundingAmount || 0),
          currency: form.fundingCurrency.trim().toUpperCase() || "USD",
          coverage: splitValues(form.fundingCoverage),
          description: form.fundingDescription.trim(),
        },
        applicationOpenDate: form.applicationOpenDate || null,
        deadline: form.deadline,
        eligibleCountries: splitValues(form.eligibleCountries),
        eligibleNationalities: splitValues(form.eligibleNationalities),
        minimumGpa: nullableNumber(form.minimumGpa),
        gpaScale: nullableNumber(form.gpaScale),
        minimumAge: nullableNumber(form.minimumAge),
        maximumAge: nullableNumber(form.maximumAge),
        requirements: splitValues(form.requirements),
        requiredDocuments: splitValues(form.requiredDocuments),
        benefits: splitValues(form.benefits),
        applicationSteps: splitValues(form.applicationSteps),
        officialSourceUrl: form.officialSourceUrl.trim(),
        applicationUrl: form.applicationUrl.trim(),
      };

      await onSubmit(payload);
      setStatusMessage("Opportunity saved successfully and submitted for admin review.");
    } catch (error) {
      setStatusMessage(error.message || "The opportunity could not be saved.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitForm} className="space-y-6">
      <Section
        title="Basic information"
        description="Use the official opportunity title and provider information."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClassName}>Opportunity title</label>
            <input
              required
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              className={inputClassName}
              placeholder="Example: Global Research Fellowship 2027"
            />
          </div>

          <div>
            <label className={labelClassName}>Provider name</label>
            <input
              required
              value={form.providerName}
              onChange={(event) => updateField("providerName", event.target.value)}
              className={inputClassName}
              placeholder="University or foundation"
            />
          </div>

          <div>
            <label className={labelClassName}>Provider logo URL</label>
            <input
              type="url"
              value={form.providerLogo}
              onChange={(event) => updateField("providerLogo", event.target.value)}
              className={inputClassName}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className={labelClassName}>Category</label>
            <select
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              className={inputClassName}
            >
              {opportunityCategories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClassName}>Fields of study</label>
            <textarea
              rows={3}
              value={form.fieldsOfStudy}
              onChange={(event) => updateField("fieldsOfStudy", event.target.value)}
              className={textareaClassName}
              placeholder={"Computer Science\nArtificial Intelligence"}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClassName}>Eligible education levels</label>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {educationLevels.map((item) => (
                <label
                  key={item.value}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.educationLevels.includes(item.value)}
                    onChange={() => toggleEducationLevel(item.value)}
                    className="h-4 w-4"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelClassName}>Short description</label>
            <textarea
              required
              rows={3}
              maxLength={500}
              value={form.shortDescription}
              onChange={(event) => updateField("shortDescription", event.target.value)}
              className={textareaClassName}
              placeholder="A concise summary shown on opportunity cards."
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClassName}>Full description</label>
            <textarea
              required
              rows={9}
              value={form.fullDescription}
              onChange={(event) => updateField("fullDescription", event.target.value)}
              className={textareaClassName}
              placeholder="Provide complete official details."
            />
          </div>
        </div>
      </Section>

      <Section title="Funding" description="Enter the published funding amount and coverage.">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={labelClassName}>Funding type</label>
            <select
              value={form.fundingType}
              onChange={(event) => updateField("fundingType", event.target.value)}
              className={inputClassName}
            >
              {fundingTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClassName}>Amount</label>
            <input
              type="number"
              min="0"
              value={form.fundingAmount}
              onChange={(event) => updateField("fundingAmount", event.target.value)}
              className={inputClassName}
              placeholder="25000"
            />
          </div>

          <div>
            <label className={labelClassName}>Currency</label>
            <input
              maxLength={3}
              value={form.fundingCurrency}
              onChange={(event) => updateField("fundingCurrency", event.target.value)}
              className={inputClassName}
              placeholder="USD"
            />
          </div>

          <div>
            <label className={labelClassName}>Coverage</label>
            <textarea
              rows={4}
              value={form.fundingCoverage}
              onChange={(event) => updateField("fundingCoverage", event.target.value)}
              className={textareaClassName}
              placeholder={"Tuition fee\nLiving stipend\nTravel allowance"}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClassName}>Funding description</label>
            <textarea
              rows={4}
              value={form.fundingDescription}
              onChange={(event) => updateField("fundingDescription", event.target.value)}
              className={textareaClassName}
              placeholder="Explain the published funding package."
            />
          </div>
        </div>
      </Section>

      <Section title="Eligibility and dates">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={labelClassName}>Application opens</label>
            <input
              type="date"
              value={form.applicationOpenDate}
              onChange={(event) => updateField("applicationOpenDate", event.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Deadline</label>
            <input
              required
              type="date"
              value={form.deadline}
              onChange={(event) => updateField("deadline", event.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Minimum GPA</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.minimumGpa}
              onChange={(event) => updateField("minimumGpa", event.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>GPA scale</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.gpaScale}
              onChange={(event) => updateField("gpaScale", event.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Minimum age</label>
            <input
              type="number"
              min="0"
              value={form.minimumAge}
              onChange={(event) => updateField("minimumAge", event.target.value)}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Maximum age</label>
            <input
              type="number"
              min="0"
              value={form.maximumAge}
              onChange={(event) => updateField("maximumAge", event.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="lg:col-span-2">
            <label className={labelClassName}>Eligible countries</label>
            <textarea
              rows={3}
              value={form.eligibleCountries}
              onChange={(event) => updateField("eligibleCountries", event.target.value)}
              className={textareaClassName}
              placeholder={"Bangladesh\nIndia\nNepal"}
            />
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <label className={labelClassName}>Eligible nationalities</label>
            <textarea
              rows={3}
              value={form.eligibleNationalities}
              onChange={(event) => updateField("eligibleNationalities", event.target.value)}
              className={textareaClassName}
              placeholder="Leave empty when there is no nationality restriction."
            />
          </div>
        </div>
      </Section>

      <Section title="Application preparation">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["requirements", "Requirements", "Relevant degree\nMinimum academic result"],
            ["requiredDocuments", "Required documents", "Transcript\nCV\nStatement of purpose"],
            ["benefits", "Benefits", "Tuition support\nMonthly stipend"],
            ["applicationSteps", "Application steps", "Create an account\nUpload documents\nSubmit application"],
          ].map(([field, label, placeholder]) => (
            <div key={field}>
              <label className={labelClassName}>{label}</label>
              <textarea
                rows={6}
                value={form[field]}
                onChange={(event) => updateField(field, event.target.value)}
                className={textareaClassName}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Opportunity images"
        description="Upload one cover image and up to five gallery images. Existing gallery images can be removed before saving."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className={labelClassName}>Cover image</label>
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="h-56 w-full object-cover" />
              ) : (
                <>
                  <UploadCloud className="h-7 w-7 text-indigo-600" />
                  <span className="mt-2 text-sm font-semibold text-slate-700">
                    Choose a cover image
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setCoverFile(event.target.files?.[0] || null)}
                className="sr-only"
              />
            </label>
          </div>

          <div>
            <label className={labelClassName}>Gallery images</label>
            <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
              <ImagePlus className="h-7 w-7 text-indigo-600" />
              <span className="mt-2 text-sm font-semibold text-slate-700">
                Select gallery images
              </span>
              <span className="mt-1 text-xs text-slate-500">
                {savedGallery.length + galleryFiles.length}/5 selected images
              </span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleGallerySelection}
                className="sr-only"
              />
            </label>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {savedGallery.map((asset) => (
                <div key={asset.url} className="relative overflow-hidden rounded-xl border">
                  <img src={asset.url} alt="Saved gallery" className="h-24 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() =>
                      setSavedGallery((current) =>
                        current.filter((item) => item.url !== asset.url)
                      )
                    }
                    className="absolute right-1 top-1 rounded-lg bg-white/95 p-1 text-red-600 shadow"
                    aria-label="Remove saved image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {galleryPreviews.map((asset, index) => (
                <div key={asset.url} className="relative overflow-hidden rounded-xl border">
                  <img
                    src={asset.url}
                    alt="New gallery preview"
                    className="h-24 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewGalleryFile(index)}
                    className="absolute right-1 top-1 rounded-lg bg-white/95 p-1 text-red-600 shadow"
                    aria-label="Remove selected image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Official links">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClassName}>Official source URL</label>
            <input
              required
              type="url"
              value={form.officialSourceUrl}
              onChange={(event) => updateField("officialSourceUrl", event.target.value)}
              className={inputClassName}
              placeholder="https://official-provider.org/program"
            />
          </div>

          <div>
            <label className={labelClassName}>Application URL</label>
            <input
              required
              type="url"
              value={form.applicationUrl}
              onChange={(event) => updateField("applicationUrl", event.target.value)}
              className={inputClassName}
              placeholder="https://official-provider.org/apply"
            />
          </div>
        </div>
      </Section>

      {statusMessage ? (
        <div
          className={`rounded-xl border p-4 text-sm ${
            statusMessage.toLowerCase().includes("success")
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          {statusMessage}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
