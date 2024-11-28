"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import Modal from "../modals/Modal";
import { useProductModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LoaderCircle, Trash } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { Category, Product } from "@/types";
import { useUser } from "@clerk/nextjs";
import { getIconComponent } from "@/lib/dynamicIcons";
import { Switch } from "../ui/switch";
import { createClient } from "@/supabase/client";

enum STEPS {
  INFO = 0,
  CATEGORIES = 1,
  SETTINGS = 2,
  IMAGES = 3,
}

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "name is required.")
    .max(100, "name should be less than 100 characters."),
  description: z
    .string()
    .min(1, "description is required.")
    .max(500, "description should be less than 500 characters."),
  details: z
    .array(
      z.string().min(1).max(100, "input should be less than 100 characters.")
    )
    .min(1, "details are required.")
    .max(100, "name should be less than 100 characters."),
  price: z.coerce.number().min(1),
  categories: z.array(z.string()).min(1, {
    message: "You must select at least one category.",
  }),
  image_paths: z.array(z.string()),
  etsy_link: z.string().min(1, "name is required."),
  is_published: z.boolean().default(false).optional(),
  is_archieved: z.boolean().default(false).optional(),
  is_featured: z.boolean().default(false).optional(),
});

interface ProductModalProps {
  initialData: Product | null;
  categories: Category[] | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  initialData,
  categories,
}) => {
  const [step, setStep] = useState(STEPS.INFO);
  const ProductModal = useProductModal();
  const { user } = useUser();
  const supabaseClient = createClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          description: "",
          details: [],
          price: 1.0,
          categories: [],
          image_paths: [],
          etsy_link: "/",
          is_published: false,
          is_archieved: false,
          is_featured: false,
        },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isValid = form.formState.isValid;

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const onClose = () => {
    form.reset();

    ProductModal.onClose();

    setStep(STEPS.INFO);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      console.log("Submitted Values:", values); // Log the form values

      if (!user) return;

      const { data: productData, error: productError } = await supabaseClient
        .from("products")
        .insert({
          name: values.name,
          description: values.description,
          details: values.details,
          price: values.price,
          categories: values.categories,
          image_paths: values.image_paths,
          etsy_link: values.etsy_link,
          is_published: values.is_published,
          is_archieved: values.is_archieved,
          is_featured: values.is_featured,
        });

      if (productError) {
        console.error("Supabase Insert Error:", productError); // Log Supabase error
        throw productError;
      }

      console.log("Inserted Product Data:", productData); // Log successful insert data
      toast({
        title: "Success",
        description: "Product created successfully!",
      });
    } catch (error: any) {
      console.error("Submission Error:", error); // Log general error
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.message,
      });
    } finally {
      onClose(); // Close the modal
    }
  };

  if (!categories) return null;

  const actionButton = initialData ? "Update" : "Create";
  const toastMessage = initialData ? "Updated product" : "Created product";

  let title;
  let description;
  let bodyContent;

  if (step === STEPS.INFO) {
    title = "Create a product";
    description = "First fill out basic info.";
    bodyContent = (
      <>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {field.value &&
                    field.value.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          disabled={isSubmitting}
                          value={detail}
                          onChange={(e) => {
                            const updatedDetails = [...field.value];
                            updatedDetails[index] = e.target.value;
                            field.onChange(updatedDetails);
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          type="button"
                          onClick={() => {
                            const updatedDetails = field.value.filter(
                              (_, idx) => idx !== index
                            );
                            field.onChange(updatedDetails);
                          }}
                        >
                          <Trash />
                        </Button>
                      </div>
                    ))}
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      const updatedDetails = [...field.value, ""];
                      field.onChange(updatedDetails);
                    }}
                  >
                    Add Detail
                  </Button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.details?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per unit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="9.99"
                  disabled={isSubmitting}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only valid decimal numbers up to 2 places
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />
      </>
    );
  }

  if (step === STEPS.SETTINGS) {
    title = "Settings";
    description = "Settin etsy backlink and apply product status.";
    bodyContent = (
      <>
        <FormField
          control={form.control}
          name="etsy_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etsy Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  disabled={isSubmitting}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.etsy_link?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish</FormLabel>
                <FormDescription>
                  Publish product after creation.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_archieved"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Archieved</FormLabel>
                <FormDescription>
                  If selected, voids published/draft state.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured</FormLabel>
                <FormDescription>
                  Give product priority on homepage.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />{" "}
      </>
    );
  }

  if (step === STEPS.CATEGORIES) {
    title = "Categories";
    description = "Choose multiple categories. Add categories in settings.";
    bodyContent = (
      <>
        <ToggleGroup
          type="multiple"
          value={form.watch("categories")}
          disabled={isSubmitting}
          onValueChange={(value) => form.setValue("categories", value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
        >
          {categories.map((category) => {
            const Icon = getIconComponent(category.icon);

            if (!Icon) {
              return null;
            }
            return (
              <ToggleGroupItem
                key={category.id}
                value={category.id}
                aria-label={`Toggle ${category.name}`}
                className={`hover:bg-neutral-200 border-2 col-span-1 flex justify-start font-semibold h-14 ${
                  form.watch("categories").includes(category.id)
                    ? "border-black"
                    : "border-neutral-200"
                }`}
              >
                <Icon />
                {category.name}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
        <FormMessage>{form.formState.errors.categories?.message}</FormMessage>
      </>
    );
  }

  if (step === STEPS.IMAGES) {
    title = "Images";
    description = "Upload supports jpeg, jpg, and png.";
    bodyContent = (
      <FormField
        control={form.control}
        name="image_paths"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ImageUpload
                disabled={isSubmitting}
                images={field.value} // Extract URLs for the ImageUpload component
                onChange={
                  (url) => field.onChange([...field.value, url]) // Add new image in the expected format
                }
                onRemove={
                  (url) =>
                    field.onChange(
                      field.value.filter((current) => current !== url)
                    ) // Remove image by URL
                }
              />
            </FormControl>
            <FormMessage>
              {form.formState.errors.image_paths?.message}
            </FormMessage>
          </FormItem>
        )}
      />
    );
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={ProductModal.isOpen}
      onClose={onClose}
      className="max-h-[90vh] overflow-y-auto"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          {bodyContent}
          <div className="w-full flex gap-2 justify-end">
            {step === STEPS.INFO ? null : (
              <Button
                variant="outline"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                }}
              >
                Back
              </Button>
            )}
            {step === STEPS.IMAGES ? (
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {actionButton}
              </Button>
            ) : (
              <Button
                variant="outline"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onNext();
                }}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ProductModal;
